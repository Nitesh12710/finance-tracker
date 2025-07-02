require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');

const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ status: 'active', message: 'Welcome to the Expense Tracker API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

async function connectToDatabase() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  }
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`Server running on http://localhost:${PORT}`);
  });
} else {
  module.exports.handler = async (req, res) => {
    try {
      await connectToDatabase();
      return serverless(app)(req, res);
    } catch (err) {
      console.error('DB connection error:', err);
      return res.status(503).json({ error: 'Service Unavailable' });
    }
  };
}
