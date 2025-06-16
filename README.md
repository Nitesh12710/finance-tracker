# Finance Tracker

This is a React-based finance tracking app that helps users manage their income and expenses.

## 📦 Project Structure

- `frontend/` — React app for the user interface  
- `backend/` — Node.js/Express server with MongoDB for storing transactions

## ⚙️ Environment Setup

### 🔐 Backend `.env` Configuration

Create a `.env` file inside the `backend/` folder with the following variables:

```env
PORT=5000
MONGODB_CONNECTION=your_mongodb_connection_string
JWT_SECRET=your_secret_key


🚀 Running the App
▶️ Start Backend

cd backend
npm run dev


▶️ Start Frontend
cd frontend/client
npm run dev