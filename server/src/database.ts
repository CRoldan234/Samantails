import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(__dirname, '..', 'samantails.db');

let db: SqlJsDatabase;

function saveDatabase(): void {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

export async function initializeDatabase(): Promise<void> {
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run('PRAGMA foreign_keys = ON');

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      image TEXT,
      category TEXT NOT NULL,
      description TEXT,
      rating REAL DEFAULT 0,
      type TEXT CHECK(type IN ('product', 'service')) NOT NULL,
      stock INTEGER DEFAULT 10,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price INTEGER NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  saveDatabase();
  seedDatabase();
  console.log('Base de datos SQLite inicializada correctamente');
}

function seedDatabase(): void {
  const result = db.exec('SELECT COUNT(*) as count FROM products');
  const count = result.length > 0 ? result[0].values[0][0] as number : 0;

  if (count === 0) {
    const products = [
      { name: 'Alimento Premium para Perros', price: 45900, image: 'assets/img/alimento1.png', category: 'Alimentos', description: 'Alimento balanceado con proteína de alta calidad', rating: 4.8, type: 'product' },
      { name: 'Arenero Sanitario para Gatos', price: 89900, image: 'assets/img/arenero.png', category: 'Accesorios', description: 'Arenero automático con filtro de carbón activado', rating: 4.5, type: 'product' },
      { name: 'Consulta Veterinaria General', price: 35000, image: 'assets/img/antipulgas.png', category: 'Servicios', description: 'Consulta completa con examen físico y diagnóstico', rating: 4.9, type: 'service' },
      { name: 'Peluquería Canina Completa', price: 40000, image: 'assets/img/transporte.png', category: 'Servicios', description: 'Baño, corte de pelo, uñas y limpieza dental', rating: 4.7, type: 'service' },
      { name: 'Juguete Interactivo para Aves', price: 23500, image: 'assets/img/ave.png', category: 'Juguetes', description: 'Juguete de madera natural para loros y guacamayos', rating: 4.6, type: 'product' },
      { name: 'Guardería para Mascotas', price: 15000, image: 'assets/img/cama.png', category: 'Servicios', description: 'Cuidado diurno con actividades recreativas', rating: 4.8, type: 'service' },
      { name: 'Transportadora para Mascotas', price: 67800, image: 'assets/img/transporte.png', category: 'Accesorios', description: 'Transportadora ventilada y segura para viajes', rating: 4.9, type: 'product' },
      { name: 'Shampoo Antipulgas', price: 18900, image: 'assets/img/antipulgas.png', category: 'Cuidado e Higiene', description: 'Shampoo natural para control de pulgas', rating: 4.6, type: 'product' },
      { name: 'Cama Térmica para Mascotas', price: 54900, image: 'assets/img/cama.png', category: 'Confort', description: 'Cama térmica para invierno, tamaño grande', rating: 4.8, type: 'product' },
    ];

    const stmt = db.prepare(
      'INSERT INTO products (name, price, image, category, description, rating, type) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );

    for (const p of products) {
      stmt.run([p.name, p.price, p.image, p.category, p.description, p.rating, p.type]);
    }
    stmt.free();
    saveDatabase();
    console.log(`${products.length} productos insertados`);
  }
}

export function getDb(): SqlJsDatabase {
  return db;
}

export function queryAll(sql: string, params?: any[]): any[] {
  const stmt = db.prepare(sql);
  if (params) stmt.bind(params);
  const rows: any[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

export function queryOne(sql: string, params?: any[]): any | null {
  const rows = queryAll(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

export function run(sql: string, params?: any[]): { lastInsertRowid: number; changes: number } {
  db.run(sql, params);
  saveDatabase();
  const lastId = db.exec('SELECT last_insert_rowid()');
  const changes = db.getRowsModified();
  return {
    lastInsertRowid: lastId.length > 0 ? lastId[0].values[0][0] as number : 0,
    changes
  };
}

export { saveDatabase };
