const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/signup', async(req,res) => {
  try {
    const {username,email,password } = req.body;
    const user = new User({username,email,password });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login',async(req,res) => {
  try {
    const {email,password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{expiresIn:'2h'});
    res.json({token});
  } catch(err) {
    res.status(400).json({error:err.message});
  }
});

module.exports = router;