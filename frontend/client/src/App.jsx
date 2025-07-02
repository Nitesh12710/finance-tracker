import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home'; // <- Your new modern landing page

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              {/* ✅ Public Routes */}
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <div className="w-full">
                    <Login />
                  </div>
                }
              />
              <Route
                path="/signup"
                element={
                  <div className="w-full">
                    <Signup />
                  </div>
                }
              />

              {/* ✅ Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/dashboard"
                  element={
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                      <Dashboard />
                    </div>
                  }
                />
                <Route
                  path="/transactions"
                  element={
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                      <Transactions />
                    </div>
                  }
                />
              </Route>
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
