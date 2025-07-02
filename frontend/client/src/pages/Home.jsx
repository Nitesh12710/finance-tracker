// src/pages/Home.js
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-100 to-blue-100 px-6">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
          Finance Tracker
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl mx-auto">
          Take control of your money. Track your income, expenses, and savings all in one place.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-2xl shadow-md transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
