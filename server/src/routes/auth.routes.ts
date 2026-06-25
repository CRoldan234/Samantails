import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { queryOne, run } from '../database';
import { generateToken, AuthRequest, authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: 'Todos los campos son requeridos' });
    return;
  }

  const existing = queryOne(
    'SELECT id FROM users WHERE email = ? OR username = ?',
    [email, username]
  );
  if (existing) {
    res.status(409).json({ error: 'El usuario o email ya está registrado' });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const result = run(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );

  const token = generateToken(result.lastInsertRowid, username);

  res.status(201).json({
    message: 'Usuario registrado exitosamente',
    token,
    user: { id: result.lastInsertRowid, username, email }
  });
});

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Usuario y contraseña requeridos' });
    return;
  }

  const user = queryOne(
    'SELECT * FROM users WHERE username = ? OR email = ?',
    [username, username]
  ) as any;

  if (!user) {
    res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    return;
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    return;
  }

  const token = generateToken(user.id, user.username);

  res.json({
    message: 'Login exitoso',
    token,
    user: { id: user.id, username: user.username, email: user.email }
  });
});

router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  const user = queryOne(
    'SELECT id, username, email, created_at FROM users WHERE id = ?',
    [req.userId!]
  ) as any;

  if (!user) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }

  res.json({ user });
});

export default router;
