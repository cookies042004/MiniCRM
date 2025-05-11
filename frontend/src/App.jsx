import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation
} from 'react-router-dom';

import CampaignBuilder from './pages/CampaignBuilder';
import CampaignHistory from './pages/CampaignHistory';
import Login from './pages/Login';
import Home from './pages/Home';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();
  return token ? children : <Navigate to="/" state={{ from: location }} replace />;
};

const Navbar = ({ logout }) => {
  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">Mini CRM</div>
        <div className="space-x-6 text-sm sm:text-base flex items-center">
          <Link to="/builder" className="text-gray-700 hover:text-blue-600 transition">Create Campaign</Link>
          <Link to="/history" className="text-gray-700 hover:text-blue-600 transition">View History</Link>
          <button
            onClick={logout}
            className="text-red-500 border border-red-400 hover:border-red-600 px-3 py-1 rounded transition hover:cursor-pointer hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  const { token, logout } = useAuth();
  const location = window.location.pathname;
  const showNavbar = token && (location === '/builder' || location === '/history');

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200">
        {showNavbar && <Navbar logout={logout} />}

        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/builder" element={<PrivateRoute><CampaignBuilder /></PrivateRoute>} />
            <Route path="/history" element={<PrivateRoute><CampaignHistory /></PrivateRoute>} />
            <Route path="*" element={<div className="text-center text-red-500 text-lg mt-10">404 - Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
