const express = require('express');
const Transcation = require('../models/Transcation');
const router = express.Router();

// Middleware to protect routes (JWT check)
const auth = require('../middleware/auth');

// Get all transactions (protected)
router.get('/', auth, async (req, res) => {
  try {
    const transcation = await Transcation.find({ user: req.user.id });
    res.json(transcation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new transaction (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { amount, category, type } = req.body;
    const transcation = new Transcation({ user: req.user.id, amount, category, type });
    await transcation.save();
    res.status(201).json(transcation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;