import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import { Lock, User } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuth') === 'true'
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // O'qituvchi login va paroli
    if (username === 'teacher' && password === 'teacherz14') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuth', 'true');
    } else {
      setError('Login yoki parol xato!');
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <AdminPanel />
            ) : (
              <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-100 font-sans p-4">
                <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl w-96 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center font-black text-2xl text-white">Z</div>
                    <h1 className="text-xl font-bold">Ziyo Education</h1>
                    <p className="text-xs text-slate-400">O'qituvchi uchun Admin Panel</p>
                  </div>

                  {error && <div className="bg-rose-500/20 border border-rose-500 text-rose-400 text-xs p-3 rounded-xl text-center">{error}</div>}

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 mb-1 block">Login</label>
                      <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5">
                        <User size={16} className="text-slate-400 mr-2" />
                        <input
                          type="text"
                          placeholder="Loginingizni kiriting"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="bg-transparent outline-none text-sm w-full text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-400 mb-1 block">Parol</label>
                      <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5">
                        <Lock size={16} className="text-slate-400 mr-2" />
                        <input
                          type="password"
                          placeholder="Parolingizni kiriting"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-transparent outline-none text-sm w-full text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold text-sm transition text-white shadow-lg shadow-indigo-600/30">
                    Kirish
                  </button>
                </form>
              </div>
            )
          }
        />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}