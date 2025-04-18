import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET one entry
router.get('/:id', requireAuth, async (req, res) => {
    const entryId = parseInt(req.params.id);
  
    try {
      const entry = await prisma.journalEntry.findFirst({
        where: {
          entry_id: entryId,
          user_id: req.userId
        },
        include: { mood: true }
      });
  
      if (!entry) return res.status(404).json({ message: 'Entry not found' });
  
      res.json(entry);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch entry' });
    }
  });
  

// PUT (update)
router.put('/:id', requireAuth, async (req, res) => {
    const entryId = parseInt(req.params.id);
    const { title, content, mood_id, weather_info } = req.body;
  
    try {
      const updated = await prisma.journalEntry.updateMany({
        where: {
          entry_id: entryId,
          user_id: req.userId
        },
        data: {
          title,
          content,
          mood_id,
          weather_info
        }
      });
  
      if (updated.count === 0) return res.status(404).json({ message: 'Entry not found or unauthorized' });
  
      res.json({ message: 'Entry updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update entry' });
    }
  });
  

// DELETE
router.delete('/:id', requireAuth, async (req, res) => {
    const entryId = parseInt(req.params.id);
  
    try {
      const deleted = await prisma.journalEntry.deleteMany({
        where: {
          entry_id: entryId,
          user_id: req.userId
        }
      });
  
      if (deleted.count === 0) return res.status(404).json({ message: 'Entry not found or unauthorized' });
  
      res.json({ message: 'Entry deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete entry' });
    }
  });
  

export default router;
