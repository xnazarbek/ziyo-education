import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { Award, Users, Sun, Moon, Plus, Minus } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function AdminPanel() {
  const {
    groups, selectedGroup, setSelectedGroup,
    students, setAttendance, updateCoins,
    isDarkMode, toggleTheme,
    weeks, activeWeek, setActiveWeek, addWeek
  } = useAppStore();

  const [coinInputs, setCoinInputs] = useState({});

  const filteredStudents = students
    .filter((s) => s.group === selectedGroup)
    .sort((a, b) => b.coins - a.coins);

  const handleCoins = (id, isAdd) => {
    const val = parseInt(coinInputs[id], 10);
    if (!isNaN(val) && val > 0) {
      const limitedVal = Math.min(5, val); // Max 5 limit
      updateCoins(id, isAdd ? limitedVal : -limitedVal);
      setCoinInputs({ ...coinInputs, [id]: '' });
    }
  };

  return (
    <div className={`flex h-screen font-sans ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-amber-50/50 text-slate-900'}`}>
      {/* Sidebar */}
      <aside className={`w-64 border-r p-6 flex flex-col justify-between ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-amber-200'}`}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-xl">Z</div>
            <h1 className="text-xl font-bold text-indigo-500">Ziyo Education</h1>
          </div>

          <div>
            <h2 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-slate-400' : 'text-amber-800/60'}`}>
              Groups
            </h2>
            <nav className="space-y-2">
              {groups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition ${selectedGroup === group
                      ? 'bg-indigo-600 text-white'
                      : isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-amber-100'
                    }`}
                >
                  Group {group}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm border transition ${isDarkMode ? 'border-slate-700 bg-slate-800 text-amber-400' : 'border-amber-300 bg-amber-100 text-slate-800'
            }`}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 flex flex-col justify-between">
        <div>
          <header className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Group {selectedGroup} Attendance</h2>
              <p className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Active Week: Week {activeWeek}</p>
            </div>
          </header>

          {/* Table */}
          <div className={`border rounded-2xl overflow-hidden shadow-xl ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-amber-200'}`}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b text-xs uppercase ${isDarkMode ? 'border-slate-800 bg-slate-900/50 text-slate-400' : 'border-amber-100 bg-amber-100/50 text-slate-600'}`}>
                  <th className="py-4 px-6">Student Name</th>
                  {DAYS.map((day) => (
                    <th key={day} className="py-4 px-2 text-center">{day}</th>
                  ))}
                  <th className="py-4 px-6 text-right">Coins</th>
                  <th className="py-4 px-6 text-center">Manage Coins (Max 5)</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-amber-100'}`}>
                {filteredStudents.map((student, index) => {
                  const weekKey = `week_${activeWeek}`;
                  const currentAtt = student.attendance[weekKey] || {};

                  return (
                    <tr key={student.id} className="hover:bg-slate-800/30">
                      {/* Student Name with Modern Rank Badges */}
                      <td className="py-4 px-6 font-medium flex items-center gap-3">
                        {index === 0 && (
                          <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg shadow-amber-500/30">
                            🥇 1
                          </span>
                        )}
                        {index === 1 && (
                          <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-slate-400 to-slate-200 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg shadow-slate-400/20">
                            🥈 2
                          </span>
                        )}
                        {index === 2 && (
                          <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-700 to-amber-500 text-white font-black text-xs flex items-center justify-center shadow-lg shadow-amber-700/20">
                            🥉 3
                          </span>
                        )}
                        {index > 2 && (
                          <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center border ${isDarkMode
                              ? 'bg-slate-800/80 border-slate-700 text-slate-400'
                              : 'bg-amber-100/60 border-amber-200 text-slate-600'
                            }`}>
                            {index + 1}
                          </span>
                        )}

                        <span className="font-semibold text-sm">{student.name}</span>
                      </td>

                      {DAYS.map((day) => {
                        const status = currentAtt[day] || 'none';
                        return (
                          <td key={day} className="py-4 px-2 text-center">
                            <select
                              value={status}
                              onChange={(e) => setAttendance(student.id, day, e.target.value)}
                              className={`w-10 h-10 rounded-xl font-bold text-xs outline-none cursor-pointer text-center appearance-none border transition ${status === 'present' ? 'bg-emerald-500 text-white border-emerald-600' :
                                  status === 'absent' ? 'bg-rose-500 text-white border-rose-600' :
                                    status === 'excused' ? 'bg-amber-500 text-white border-amber-600' :
                                      isDarkMode ? 'bg-slate-800 text-slate-500 border-slate-700' : 'bg-slate-100 text-slate-400 border-slate-300'
                                }`}
                            >
                              <option value="none" className="bg-slate-900 text-white">-</option>
                              <option value="present" className="bg-emerald-600 text-white">P</option>
                              <option value="absent" className="bg-rose-600 text-white">A</option>
                              <option value="excused" className="bg-amber-600 text-white">E</option>
                            </select>
                          </td>
                        );
                      })}

                      <td className="py-4 px-6 text-right font-bold text-amber-500">
                        <div className="flex items-center justify-end gap-1">
                          <Award size={16} />
                          <span>{student.coins}</span>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <input
                            type="number"
                            max="5"
                            min="1"
                            placeholder="1-5"
                            value={coinInputs[student.id] || ''}
                            onChange={(e) => setCoinInputs({ ...coinInputs, [student.id]: e.target.value })}
                            className={`w-16 px-2 py-1.5 rounded-xl text-xs font-semibold outline-none border text-center ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-amber-50 border-amber-300 text-slate-900'
                              }`}
                          />
                          <button
                            onClick={() => handleCoins(student.id, true)}
                            className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => handleCoins(student.id, false)}
                            className="p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition"
                          >
                            <Minus size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Weekly Tabs */}
        <div className="mt-6 flex items-center gap-2 border-t border-slate-800 pt-4">
          <span className="text-xs font-bold text-slate-400 uppercase mr-2">Weeks:</span>
          {weeks.map((w) => (
            <button
              key={w}
              onClick={() => setActiveWeek(w)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeWeek === w
                  ? 'bg-indigo-600 text-white'
                  : isDarkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-amber-100 text-slate-700 hover:bg-amber-200'
                }`}
            >
              Week {w}
            </button>
          ))}
          <button
            onClick={addWeek}
            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition"
            title="Add New Week"
          >
            <Plus size={16} />
          </button>
        </div>
      </main>
    </div>
  );
}