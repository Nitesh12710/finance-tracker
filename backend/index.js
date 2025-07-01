require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');

const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'active',
    message: 'Welcome to the Expense Tracker API',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// MongoDB connection with robust error handling
let isConnected = false;
let connectionAttempts = 0;
const MAX_RETRIES = 3;

async function connectToDatabase() {
  if (isConnected) return true;
  
  try {
    if (connectionAttempts >= MAX_RETRIES) {
      throw new Error('Max connection attempts reached');
    }

    if (!process.env.MONGODB_CONNECTION) {
      throw new Error('MongoDB connection string is missing');
    }

    connectionAttempts++;
    
    await mongoose.connect(process.env.MONGODB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      serverSelectionTimeoutMS: 5000,
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      isConnected = false;
    });

    isConnected = true;
    console.log('MongoDB connected successfully');
    return true;
  } catch (err) {
    console.error('Database connection failed:', err.message);
    isConnected = false;
    throw err;
  }
}

// Error handling middleware (must be after all routes)
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Vercel serverless handler with connection management
module.exports.handler = async (req, res) => {
  try {
    await connectToDatabase();
    return serverless(app)(req, res);
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(503).json({
      error: 'Service Unavailable',
      message: 'Database connection failed'
    });
  }
};

// Optional: For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
    connectToDatabase().catch(console.error);
  });
}