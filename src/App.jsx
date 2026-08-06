import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import LoginPage from './pages/LoginPage';
// Agar boshqa sahifalaringiz bo'lsa ularni ham shu yerga import qilasiz

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuth') === 'true'
  );

  return (
    <Router>
      <Routes>
        {/* Login sahifasi */}
        <Route 
          path="/login" 
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} 
        />

        {/* Himoyalangan Admin Panel */}
        <Route 
          path="/admin" 
          element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />} 
        />

        {/* Boshqa manzildan /login ga yo'naltirish */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}