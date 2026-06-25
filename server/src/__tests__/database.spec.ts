import { queryAll, queryOne, run } from '../database';

describe('Database Operations', () => {
  beforeAll(async () => {
    const { initializeDatabase } = await import('../database');
    await initializeDatabase();
  });

  it('should query all products', () => {
    const products = queryAll('SELECT * FROM products');
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('name');
    expect(products[0]).toHaveProperty('price');
    expect(products[0]).toHaveProperty('category');
  });

  it('should query a single product', () => {
    const product = queryOne('SELECT * FROM products WHERE id = ?', [1]);
    expect(product).not.toBeNull();
    expect(product.name).toBe('Alimento Premium para Perros');
  });

  it('should filter products by category', () => {
    const products = queryAll('SELECT * FROM products WHERE category = ?', ['Servicios']);
    expect(products.length).toBeGreaterThan(0);
    products.forEach(p => expect(p.category).toBe('Servicios'));
  });

  it('should return null for non-existent product', () => {
    const product = queryOne('SELECT * FROM products WHERE id = ?', [999]);
    expect(product).toBeNull();
  });

  it('should get distinct categories', () => {
    const rows = queryAll('SELECT DISTINCT category FROM products') as { category: string }[];
    const categories = rows.map(r => r.category);
    expect(categories).toContain('Alimentos');
    expect(categories).toContain('Servicios');
  });
});
