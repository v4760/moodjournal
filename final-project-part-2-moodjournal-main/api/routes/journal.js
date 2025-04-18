import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/requireAuth.js';
import { fetchWeather } from '../utils/fetchWeather.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', requireAuth, async (req, res) => {
  try {
    const entries = await prisma.journalEntry.findMany({
      where: { user_id: req.userId },
      include: { mood: true },
      orderBy: { created_at: 'desc' },
    });

    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch journal entries' });
  }
});

router.post('/', requireAuth, async (req, res) => {
    const { title, content, lat, lon } = req.body;
    const mood_id = parseInt(req.body.mood_id);

    console.log('Incoming entry:', { title, content, mood_id, lat, lon });
  
    try {
      const weather_info = await fetchWeather(lat, lon);
      console.log('Weather fetched:', weather_info);
  
      const newEntry = await prisma.journalEntry.create({
        data: {
          title,
          content,
          mood_id,
          weather_info,
          user_id: req.userId,
        },
      });
  
      console.log('Entry saved:', newEntry);
      res.status(201).json(newEntry);
    } catch (err) {
      console.error('Failed to create journal entry:', err);
      res.status(500).json({ message: 'Failed to create journal entry' });
    }
  });
  


router.get('/moods', async (req, res) => {
    try {
      const moods = await prisma.mood.findMany({
        orderBy: { mood_id: 'asc' }
      });
      res.json(moods);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch moods' });
    }
  });

export default router;
