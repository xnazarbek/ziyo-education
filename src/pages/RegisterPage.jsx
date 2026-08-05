import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { UserCheck, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'student';

  const [role, setRole] = useState(initialRole);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const { loginUser, students } = useAppStore();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (role === 'teacher') {
      loginUser('teacher', { username: 'Teacher' });
      navigate('/admin');
    } else {
      // Find student in existing database by name match
      const matchedStudent = students.find((s) => 
        s.name.toLowerCase().includes(username.trim().toLowerCase())
      );

      if (matchedStudent) {
        loginUser('student', { username: matchedStudent.name });
        navigate('/student');
      } else {
        alert("Student not found! Please enter a valid name from the student list.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-indigo-400">Ziyo Education</h2>
          <p className="text-slate-400 text-sm">Enter your full name to log in</p>
        </div>

        {/* Role Selector */}
        <div className="flex bg-slate-800 p-1.5 rounded-2xl gap-2">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition ${
              role === 'student' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            <UserCheck size={16} /> Student
          </button>
          <button
            type="button"
            onClick={() => setRole('teacher')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition ${
              role === 'teacher' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            <ShieldCheck size={16} /> Teacher
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase">
              {role === 'teacher' ? 'Teacher ID / Login' : 'Student Full Name'}
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={role === 'teacher' ? 'admin' : 'e.g. Nazarbek'}
              className="w-full mt-1 p-3 bg-slate-800 border border-slate-700 rounded-xl outline-none focus:border-indigo-500 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-1 p-3 bg-slate-800 border border-slate-700 rounded-xl outline-none focus:border-indigo-500 text-sm text-white"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl transition">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}