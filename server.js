const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Importing routes for authentication
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Importing routes for transactions
const transcationRoutes = require('./routes/transcation');
app.use('/api/transcation', transcationRoutes);

app.get('/', (req, res) => {
    res.send("Finance Tracker backend is running");
});

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);

});


