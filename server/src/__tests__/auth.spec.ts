import { generateToken } from '../middleware/auth.middleware';

describe('Auth Middleware', () => {
  it('should generate a valid JWT token', () => {
    const token = generateToken(1, 'testuser');
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });

  it('should generate different tokens for different users', () => {
    const token1 = generateToken(1, 'user1');
    const token2 = generateToken(2, 'user2');
    expect(token1).not.toBe(token2);
  });

  it('should include user info in token', () => {
    const jwt = require('jsonwebtoken');
    const token = generateToken(42, 'batman');
    const decoded: any = jwt.decode(token);
    expect(decoded.userId).toBe(42);
    expect(decoded.username).toBe('batman');
  });
});
