// api/server.js
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

app.use(cors({
  origin: 'http://localhost:3000', // frontend origin
  credentials: true               // allow cookies
}));
app.use(express.json());
app.use(cookieParser());

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.use('/api', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/journal', journalEntryRoutes); 

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
