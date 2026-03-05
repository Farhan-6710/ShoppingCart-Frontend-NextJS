import { prisma } from '../config/db';
import bcrypt from 'bcryptjs';
import { generateToken, AUTH_COOKIE_NAME } from '../utils/generateToken';
import { Request, Response } from 'express';

const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'name, email and password are required',
      });
    }

    const normalizedEmail = email.toLowerCase();

    // check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (userExists) {
      return res.status(400).json({
        error: 'user already exists with the email entered',
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
      },
    });

    // generate JWT
    const token = generateToken(user.id, res);

    return res.status(201).json({
      status: 'success',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error('Error in signup:', error);
    return res.status(500).json({
      error: 'internal server error',
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // check all fields entered
    if (!email || !password) {
      return res.status(400).json({
        error: 'email and password are required',
      });
    }

    const normalizedEmail = email.toLowerCase();

    // check if user exists in the table
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return res.status(401).json({
        error: 'invalid email or password',
      });
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'invalid email or password',
      });
    }

    // generate JWT
    const token = generateToken(user.id, res);

    return res.status(200).json({
      status: 'success',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({
      error: 'internal server error',
    });
  }
};

const logout = async (req: Request, res: Response) => {

  // remove the jwt from cookies
  res.cookie(AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
  });

  return res.status(200).json({
    status: 'success',
    message: 'logged out successfully',
  });
};

export { signup, login, logout };
