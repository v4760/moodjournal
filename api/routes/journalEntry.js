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
    console.error('[GET ERROR] Failed to fetch entry:', err);
    res.status(500).json({ message: 'Failed to fetch entry' });
  }
});


// PUT (update)
router.put('/:id', requireAuth, async (req, res) => {
  const entryId = parseInt(req.params.id);
  const { title, content, mood_id, weather_info } = req.body;

  console.log('--- PUT /api/journal/:id ---');
  console.log('Entry ID:', entryId);
  console.log('User ID:', req.userId);
  console.log('Request Body:', { title, content, mood_id, weather_info });

  const updateData = {
    title,
    content,
    mood_id
  };

  if (weather_info !== undefined) {
    updateData.weather_info = weather_info;
  }

  console.log('Update Data Sent to Prisma:', updateData);

  try {
    const updated = await prisma.journalEntry.updateMany({
      where: {
        entry_id: entryId,
        user_id: req.userId
      },
      data: updateData
    });

    if (updated.count === 0) {
      console.warn('No entry found or user unauthorized to update');
      return res.status(404).json({ message: 'Entry not found or unauthorized' });
    }

    console.log('Entry updated successfully');
    res.json({ message: 'Entry updated successfully' });
  } catch (err) {
    console.error('[PUT ERROR] Failed to update entry:', err);
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

    if (deleted.count === 0) {
      console.warn('No entry found or user unauthorized to delete');
      return res.status(404).json({ message: 'Entry not found or unauthorized' });
    }

    console.log('Entry deleted successfully');
    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    console.error('[DELETE ERROR] Failed to delete entry:', err);
    res.status(500).json({ message: 'Failed to delete entry' });
  }
});

export default router;
