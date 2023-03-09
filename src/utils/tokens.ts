import jwt from 'jsonwebtoken';

export function generateToken(identifier: number, role: string): string {
  return jwt.sign(
    { id: identifier, role: role },
    process.env.JWT_SECRETE_KEY ?? 'ML/AI',
    {
      expiresIn: 60 * 60 * 24,
    }
  ) as string;
}

export function verifyToken(token: string): unknown {
  return jwt.verify(token, process.env.JWT_SECRETE_KEY ?? 'ML/AI');
}
