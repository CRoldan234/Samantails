import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './database';
import authRoutes from './routes/auth.routes';
import productsRoutes from './routes/products.routes';
import ordersRoutes from './routes/orders.routes';

async function startServer() {
  await initializeDatabase();

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
  app.use(express.json());

  app.use('/api/auth', authRoutes);
  app.use('/api/products', productsRoutes);
  app.use('/api/orders', ordersRoutes);

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.listen(PORT, () => {
    console.log(`Servidor Samantails corriendo en http://localhost:${PORT}`);
    console.log(`Endpoints disponibles:`);
    console.log(`  POST   /api/auth/register`);
    console.log(`  POST   /api/auth/login`);
    console.log(`  GET    /api/auth/me`);
    console.log(`  GET    /api/products`);
    console.log(`  GET    /api/products?category=Alimentos`);
    console.log(`  GET    /api/products/categories`);
    console.log(`  GET    /api/products/:id`);
    console.log(`  POST   /api/orders`);
    console.log(`  GET    /api/orders`);
    console.log(`  GET    /api/orders/:id`);
  });
}

startServer().catch(console.error);

export default startServer;
