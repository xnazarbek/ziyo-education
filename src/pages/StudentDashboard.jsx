import React from 'react';
import { useAppStore } from '../store/appStore';
import { Award, LogOut, CheckCircle, XCircle, Clock, TrendingUp, Flame, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function StudentDashboard() {
  const { students, currentUser, logoutUser, activeWeek } = useAppStore();
  const navigate = useNavigate();

  // Find logged in student or default to first student of group
  const currentStudent = students.find((s) => s.name.toLowerCase() === currentUser?.username?.toLowerCase()) || students[0];

  // Calculate student's rank in their group based on coins
  const groupStudents = students
    .filter((s) => s.group === currentStudent.group)
    .sort((a, b) => b.coins - a.coins);

  const studentRank = groupStudents.findIndex((s) => s.id === currentStudent.id) + 1;

  // Motivation messages based on student rank
  const getMotivationMessage = (rank, total) => {
    if (rank === 1) {
      return {
        quote: "Outstanding! You are leading the group. Keep setting the standard!",
        icon: <Flame className="text-amber-400" size={24} />,
        badge: "👑 Group Leader"
      };
    } else if (rank <= 3) {
      return {
        quote: "Great job! You are in the Top 3. Push a little more to claim #1!",
        icon: <Zap className="text-yellow-400" size={24} />,
        badge: "🔥 Top Performer"
      };
    } else if (rank <= Math.ceil(total / 2)) {
      return {
        quote: "Solid progress! You are in the top half. Keep grinding to reach the Top 3!",
        icon: <TrendingUp className="text-emerald-400" size={24} />,
        badge: "⚡ Rising Star"
      };
    } else {
      return {
        quote: "Don't give up! Every effort counts. Earn more coins and climb up the leaderboard!",
        icon: <TrendingUp className="text-indigo-400" size={24} />,
        badge: "💪 Keep Going"
      };
    }
  };

  const motivation = getMotivationMessage(studentRank, groupStudents.length);
  const weekKey = `week_${activeWeek}`;
  const currentAtt = currentStudent.attendance[weekKey] || {};

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 max-w-md mx-auto space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center font-black text-xl text-white">
            {currentStudent.name[0]}
          </div>
          <div>
            <h3 className="font-bold text-base">{currentStudent.name}</h3>
            <p className="text-xs text-indigo-400 font-semibold">Group {currentStudent.group}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-rose-400 transition" title="Log Out">
          <LogOut size={20} />
        </button>
      </div>

      {/* Coin Balance & Rank Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Coins */}
        <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-5 rounded-3xl text-slate-950 shadow-xl flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase tracking-wider opacity-80">Coins</span>
            <Award size={24} />
          </div>
          <h2 className="text-4xl font-black mt-2">{currentStudent.coins}</h2>
        </div>

        {/* Group Rank */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-5 rounded-3xl text-white shadow-xl flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase tracking-wider opacity-80">Group Rank</span>
            <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-lg">{motivation.badge}</span>
          </div>
          <h2 className="text-4xl font-black mt-2">#{studentRank} <span className="text-xs font-normal opacity-70">/ {groupStudents.length}</span></h2>
        </div>
      </div>

      {/* Motivation Card */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-start gap-3 shadow-lg">
        <div className="p-2 bg-slate-800 rounded-xl">{motivation.icon}</div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Motivation</h4>
          <p className="text-sm font-semibold text-slate-200">{motivation.quote}</p>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-sm text-slate-300">Attendance (Week {activeWeek})</h4>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {DAYS.map((day) => {
            const status = currentAtt[day] || 'none';
            return (
              <div key={day} className="flex flex-col items-center gap-2 p-3 bg-slate-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-400">{day}</span>
                {status === 'present' && <CheckCircle className="text-emerald-400" size={20} />}
                {status === 'absent' && <XCircle className="text-rose-400" size={20} />}
                {status === 'excused' && <Clock className="text-amber-400" size={20} />}
                {status === 'none' && <span className="text-slate-600 font-bold">-</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}