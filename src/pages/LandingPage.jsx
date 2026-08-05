import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { Users, Award, CalendarCheck } from 'lucide-react';

export default function LandingPage() {
  const { currentUser } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.role === 'teacher') {
      navigate('/admin');
    } else if (currentUser?.role === 'student') {
      navigate('/student');
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-xl text-white">Z</div>
            <h1 className="text-2xl font-black text-indigo-400">Ziyo Education</h1>
          </div>
          <div className="flex gap-4">
            <Link to="/login?role=student" className="px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 font-semibold text-sm transition">
              Student Portal
            </Link>
            <Link to="/login?role=teacher" className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm transition shadow-lg shadow-indigo-600/30">
              Teacher Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 text-center space-y-8">
        <h2 className="text-5xl font-extrabold leading-tight">
          Next-Generation Learning Management System
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Track attendance, monitor student performance, and reward engagement with our advanced Coin motivation system.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-left space-y-3">
            <Users className="w-8 h-8 text-indigo-400" />
            <h3 className="text-lg font-bold">Group Management</h3>
            <p className="text-slate-400 text-sm">Organized classes into distinct groups: Z11, Z13, and Z14.</p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-left space-y-3">
            <CalendarCheck className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold">Daily Attendance</h3>
            <p className="text-slate-400 text-sm">Real-time attendance statuses: Present, Absent, and Excused.</p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-left space-y-3">
            <Award className="w-8 h-8 text-amber-400" />
            <h3 className="text-lg font-bold">Coin Rewards</h3>
            <p className="text-slate-400 text-sm">Gamified learning leaderboard for student motivation.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-slate-500 text-sm">
        © 2026 Ziyo Education System. All rights reserved.
      </footer>
    </div>
  );
}