# 💸 Finance Tracker

A **full-stack MERN** (MongoDB, Express, React, Node.js) finance management application that helps users track income, expenses, and visualize their financial activity through charts and summaries.

---


---

## 🛠️ Technologies Used

### 🔗 Frontend (React)
| Tech | Description |
|------|-------------|
| **React 18** | SPA framework |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS** | Utility-first CSS framework for modern UI |
| **React Router v6** | Routing between pages |
| **Formik + Yup** | Form handling and validation |
| **Chart.js / Recharts** | Financial data visualizations |
| **Axios** | HTTP client for API requests |
| **LocalStorage** | Token storage for session auth |
| **React Context API** | Auth state management |

---

### 🧩 Backend (Node.js + Express)
| Tech | Description |
|------|-------------|
| **Express** | Web server framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM for schema modeling |
| **jsonwebtoken** | JWT token generation & verification |
| **bcryptjs** | Password hashing |
| **dotenv** | Manage environment variables |
| **CORS** | Cross-origin request support |
| **nodemon** | Hot-reloading for dev server |

---

## ⚙️ Environment Setup

### 🔐 Backend `.env` Configuration

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGODB_CONNECTION=mongodb+srv://<username>:<password>@cluster.mongodb.net/finance-tracker
JWT_SECRET=your_secure_jwt_secret


Backend:
cd backend
npm install

Frontend:
cd frontend/client
npm install


🚀 Running the App
▶️ Start Backend (Express API)
cd backend
npm run dev


▶️ Start Frontend (React UI)
cd frontend/client
npm run dev


🔐 Authentication
User registration & login via JWT-based auth

Token is stored in localStorage

Protected routes using ProtectedRoute component


Features
🔐 User login & registration

➕ Add / Edit / Delete income & expenses

📁 Categorize transactions (Food, Salary, Shopping, etc.)

📆 Track daily income/expense history

📊 Financial summary + pie/bar charts

🌐 Multi-currency support (USD, INR, PKR, EUR, etc.)

🎨 Fully responsive modern UI with Tailwind CSS



 Future Improvements
🔁 Recurring transactions

📥 Export to CSV/Excel

🌍 i18n (internationalization)

🔔 Notification system

📱 PWA support


📬 Contact
Feel free to reach out with questions, suggestions, or improvements!
Developer: Nitesh Kumar  
Email: NiteshKanjwani@gmail.com.  
