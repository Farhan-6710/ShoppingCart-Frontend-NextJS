import { Response } from 'express';
import jwt from 'jsonwebtoken';

export const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'jwt-token';

export const generateToken = (userId: string, res: Response) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  const payload = {
    id: userId,
  };
  const token = jwt.sign(payload, secret, {
    expiresIn: '7d',
  });

  res.cookie(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  return token;
};
