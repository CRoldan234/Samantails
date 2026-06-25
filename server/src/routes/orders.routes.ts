import { Router, Response } from 'express';
import { queryAll, queryOne, run } from '../database';
import { AuthRequest, authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', (req: AuthRequest, res: Response) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: 'El carrito está vacío' });
    return;
  }

  let total = 0;
  for (const item of items) {
    const product = queryOne('SELECT price FROM products WHERE id = ?', [item.productId]) as any;
    if (!product) {
      res.status(400).json({ error: `Producto ${item.productId} no encontrado` });
      return;
    }
    total += product.price * item.quantity;
  }

  const orderResult = run(
    'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
    [req.userId!, total, 'pending']
  );

  const orderId = orderResult.lastInsertRowid;

  for (const item of items) {
    const product = queryOne('SELECT price FROM products WHERE id = ?', [item.productId]) as any;
    run(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
      [orderId, item.productId, item.quantity, product.price]
    );
  }

  res.status(201).json({
    message: 'Orden creada exitosamente',
    order: { orderId, total }
  });
});

router.get('/', (req: AuthRequest, res: Response) => {
  const orders = queryAll(
    `SELECT o.*, COUNT(oi.id) as item_count
     FROM orders o
     LEFT JOIN order_items oi ON o.id = oi.order_id
     WHERE o.user_id = ?
     GROUP BY o.id
     ORDER BY o.created_at DESC`,
    [req.userId!]
  );

  res.json({ orders });
});

router.get('/:id', (req: AuthRequest, res: Response) => {
  const order = queryOne(
    'SELECT * FROM orders WHERE id = ? AND user_id = ?',
    [req.params.id, req.userId!]
  );

  if (!order) {
    res.status(404).json({ error: 'Orden no encontrada' });
    return;
  }

  const items = queryAll(
    `SELECT oi.*, p.name, p.image
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    [req.params.id]
  );

  res.json({ order, items });
});

export default router;
