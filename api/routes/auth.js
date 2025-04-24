import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        hashed_password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

export default router;
