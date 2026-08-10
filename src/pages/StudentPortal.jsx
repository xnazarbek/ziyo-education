import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Award, User, Lock, AlertCircle, LogOut } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function StudentPortal() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Tizimga kirish funksiyasi
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const q = query(
        collection(db, 'students'),
        where('username', '==', username.trim().toLowerCase()),
        where('password', '==', password.trim())
      );
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const studentData = querySnapshot.docs[0].data();
        setStudent({ id: querySnapshot.docs[0].id, ...studentData });
      } else {
        setError("Login yoki parol xato! Ismingiz va familiyangizni bo'shliqsiz kiriting (Parol: ziyoz14).");
      }
    } catch (err) {
      console.error(err);
      setError("Tizimga ulanishda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  // Agar o'quvchi tizimga kirmagan bo'lsa - Login oynasini ko'rsatish
  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-100 font-sans p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-3xl font-black mb-4 shadow-lg shadow-indigo-600/30 text-white">
              Z
            </div>
            <h1 className="text-2xl font-bold">Ziyo Education</h1>
            <p className="text-slate-400 text-sm mt-1">O'quvchilar uchun shaxsiy kabinet</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm flex items-center gap-3">
              <AlertCircle size={20} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Login (Ism va familiya, bo'shliqsiz)
              </label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-3.5 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="Masalan: abdurahimovasarvinoz"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-sm text-white outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Parol
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-3.5 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="ziyoz14"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-sm text-white outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-600/30 mt-2"
            >
              {loading ? "Tekshirilmoqda..." : "Kirish"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // O'quvchi tizimga kirgandan keyingi ko'rinishi (Shaxsiy kabineti)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 max-w-4xl mx-auto">
      {/* Yuqori qism (Header) */}
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-xl">
        <div>
          <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Group {student.group}</span>
          <h1 className="text-2xl font-black mt-1">{student.name}</h1>
        </div>
        <button
          onClick={() => setStudent(null)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-700 rounded-xl text-xs font-bold transition text-slate-300"
        >
          <LogOut size={16} />
          <span>Chiqish</span>
        </button>
      </div>

      {/* Asosiy ma'lumotlar kartochkasi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Award size={28} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Jami Coinlar</p>
            <h2 className="text-3xl font-black text-amber-500 mt-0.5">{student.coins || 0}</h2>
          </div>
        </div>
      </div>

      {/* Davomat tarixi */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold mb-4">Haftalik Davomat Tarixi</h2>
        
        {student.attendance && Object.keys(student.attendance).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(student.attendance).map(([weekKey, weekData]) => (
              <div key={weekKey} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase text-indigo-400 mb-3 tracking-wider">
                  {weekKey.replace('_', ' ')}
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {DAYS.map((day) => {
                    const status = weekData[day] || 'none';
                    return (
                      <div key={day} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
                        <span className="text-xs text-slate-400 block mb-1">{day}</span>
                        <div className="flex justify-center">
                          {status === 'present' && <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold">Keldi (P)</span>}
                          {status === 'absent' && <span className="px-2.5 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-bold">Kelmadi (A)</span>}
                          {status === 'excused' && <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold">Sababli (E)</span>}
                          {status === 'none' && <span className="text-slate-600 font-bold">-</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">Hozircha davomat ma'lumotlari kiritilmagan.</p>
        )}
      </div>
    </div>
  );
}