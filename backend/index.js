require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');

const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Expense Tracker API');
});

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// MongoDB connection (singleton for serverless)
let isConnected = false;
async function connectToDatabase() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
}

// Vercel serverless export
module.exports.handler = async (req, res) => {
  await connectToDatabase();
  return serverless(app)(req, res);
};
