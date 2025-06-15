const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// ✅ Load environment variables (make sure .env file exists)
dotenv.config({ path: './config/.env' });

// ✅ Connect to MongoDB
connectDB();

const transactions = require('./routes/transactions');

const app = express();

// ✅ Body parser
app.use(express.json());

// ✅ Logging (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ✅ API routes
app.use('/api/v1/transactions', transactions);

// ✅ Serve frontend (only in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// ✅ Use PORT from env or fallback to 5000
const PORT = process.env.PORT || 5000;

// ✅ Start server
app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV || 'default'} mode on port ${PORT}`
      .yellow.bold
  )
);
