import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import GuestDashboard from './pages/GuestDashboard';
import PrivateDashboard from './pages/PrivateDashboard';
import Navbar from './sections/navbar';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/public" element={<GuestDashboard />} />
          <Route path="/dashboard" element={<PrivateDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;