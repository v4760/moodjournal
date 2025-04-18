import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import authRoutes from './routes/auth.js';
import journalRoutes from './routes/journal.js';
import journalEntryRoutes from './routes/journalEntry.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Allow both local and Vercel frontend
const allowedOrigins = [
  'http://localhost:3000',
  'https://moodjournal-nine.vercel.app',
];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Routes
app.use('/api', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/journal', journalEntryRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
