import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Brand */}
        <div>
          <Link to="/dashboard" className="text-xl font-bold text-gray-800">
           💰 Finance Tracker
          </Link>
        </div>

        {/* Center: Main Nav Links */}
        {user && (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Transactions
            </Link>
          </div>
        )}

        {/* Right: Auth Links */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-600">Hello, {user.username}</span>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
