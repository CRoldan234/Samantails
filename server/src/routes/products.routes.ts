import { Router, Request, Response } from 'express';
import { queryAll, queryOne } from '../database';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { category } = req.query;

  let products;
  if (category && category !== 'todos') {
    products = queryAll('SELECT * FROM products WHERE category = ?', [category as string]);
  } else {
    products = queryAll('SELECT * FROM products');
  }

  res.json({ products });
});

router.get('/categories', (_req: Request, res: Response) => {
  const rows = queryAll('SELECT DISTINCT category FROM products') as { category: string }[];
  const list = rows.map(c => c.category);
  res.json({ categories: ['todos', ...list] });
});

router.get('/:id', (req: Request, res: Response) => {
  const product = queryOne('SELECT * FROM products WHERE id = ?', [req.params.id]);

  if (!product) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }

  res.json({ product });
});

export default router;
