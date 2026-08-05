import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, updateDoc, setDoc } from 'firebase/firestore';
import { Award, Sun, Moon, Plus, Minus, Database } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const INITIAL_GROUPS = ['Z13', 'Z11', 'Z14'];

// Barcha guruhlar va o'quvchilar ro'yxati
const INITIAL_STUDENTS = [
  // --- Group Z14 ---
  { id: 'z14_1', name: 'Mirzajonov Firdavs', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_2', name: 'Jabborova Zarina', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_3', name: 'Shaxobiddinova Laziza', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_4', name: 'Ochilova Hurshida', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_5', name: 'Akromov Elyor', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_6', name: 'Raimjonov Umidjon', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_7', name: 'Shomirzayev Xusrav', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_8', name: 'Kutfiddinova Malika', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_9', name: 'Raimjonov Dilyorbek', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_10', name: 'Baxtiyorov Boymirza', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_11', name: 'Abdurashidov Ma’ruf', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_12', name: 'Berdiyorova Muborak', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_13', name: 'Jumaboyeva Sarvinoz', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_14', name: 'Isoqulova Aziza', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_15', name: 'Xudoyberdiyeva Aziza', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_16', name: 'Yo\'ldashaliyev Jahongir', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_17', name: 'Safarova Mohinur', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_18', name: 'Ablazizov Shaxriyor', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_19', name: 'Nazarqulova Gulsanam', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_20', name: 'Qudratova Mohinur', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_21', name: 'Amirova Dilshoda', group: 'Z14', coins: 0, attendance: {} },
  { id: 'z14_22', name: 'Raxmatullayev Husan', group: 'Z14', coins: 0, attendance: {} },

  // --- Group Z13 ---
  { id: 'z13_1', name: 'Mahmudova Mohinur', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_2', name: 'Alisherov Bilol', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_3', name: 'Mamasaliyeva Zarina', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_4', name: 'Alimqulov Ehrombek', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_5', name: 'Xusanova Munavvar', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_6', name: 'Mo\'minova Marjona', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_7', name: 'O\'rinboyev Muhammadyusuf', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_8', name: 'Olimova Dilbar', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_9', name: 'Abduvohidova Jasmina', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_10', name: 'Xasanboyeva E\'zoza', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_11', name: 'Abduazimov Abdulaziz', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_12', name: 'Shayzoqov Sahobiddin', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_13', name: 'Rustamova Zulfizar', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_14', name: 'Eliboyev Umidjon', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_15', name: 'Qo\'chqorov Abubakr', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_16', name: 'Alijonova Lobar', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_17', name: 'Rahmatullayeva Zahro', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_18', name: 'Niyozova Muxlisa', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_19', name: 'Tursunova Zahro', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_20', name: 'Azimov Umidjon', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_21', name: 'Nosirqulov Burxonali', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_22', name: 'Mahmudova Charos', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_23', name: 'Holbo’tayeva Fotima', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_24', name: 'Holbo’tayeva Zuhra', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_25', name: 'Berdiqulov Asilbek', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_26', name: 'Mamaraimova Ra\'no', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_27', name: 'Xayrullayev Jamoliddin', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_28', name: 'Obidova Gulasal', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_29', name: 'Norbekova Dilnura', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_30', name: 'Bo’ronboyev Davlat', group: 'Z13', coins: 0, attendance: {} },
  { id: 'z13_31', name: 'Aliyeva Sabrina', group: 'Z13', coins: 0, attendance: {} },

  // --- Group Z11 ---
  { id: 'z11_1', name: 'Abdurahimova Sarvinoz', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_2', name: 'Yagafarov Rashid', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_3', name: 'Abduhoshimov Kamron', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_4', name: 'Kuliyeva Mashhura', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_5', name: 'Tolibjonova Diyora', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_6', name: 'Allayorova Mushtariybonu', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_7', name: 'Abdusodiqov Sanjar', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_8', name: 'Samadova Nigora', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_9', name: 'Akromjonov Inomjon', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_10', name: 'Abduqahharov Firdavs', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_11', name: 'Umarov Eldor', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_12', name: 'Turobjonova Pokiza', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_13', name: 'Rahmatullayev Abdulloh', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_14', name: 'Nazarqulov Muhammadjon', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_15', name: 'Haydarqulova Madina', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_16', name: 'Dilovarxonova Nigora', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_17', name: 'Soatov Ozodbek', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_18', name: 'Isoqjonov Sardor', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_19', name: 'Isoqjonov Ibroxim', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_20', name: 'Irisqulov Abror', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_21', name: 'Jo\'rayeva Munisa', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_22', name: 'Temirova Mushtariybonu', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_23', name: 'Toshpo\'latova Fazilat', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_24', name: 'Abdug\'ofurrov Asilbek', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_25', name: 'Nazarqulova Shahzoda', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_26', name: 'Norboyeva Parizoda', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_27', name: 'Abdunabiyeva Sabina', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_28', name: 'Ulug\'bekova Sarvinoz', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_29', name: 'Xudoyberdiyev Nazarbek', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_30', name: 'Boytemirova Zulfiya', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_31', name: 'Farhodova Shaxlo', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_32', name: 'Xasanov Bexruz', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_33', name: 'Xasanov Begzod', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_34', name: 'Qurbonboyeva Oydin', group: 'Z11', coins: 0, attendance: {} },
  { id: 'z11_35', name: 'Berdimurodava Shahzoda', group: 'Z11', coins: 0, attendance: {} },
];

export default function AdminPanel() {
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [selectedGroup, setSelectedGroup] = useState('Z14');
  const [students, setStudents] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [weeks, setWeeks] = useState([1]);
  const [activeWeek, setActiveWeek] = useState(1);
  const [coinInputs, setCoinInputs] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'students'), (snapshot) => {
      const studentList = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setStudents(studentList);
    });
    return () => unsubscribe();
  }, []);

  const seedDatabase = async () => {
    try {
      for (const student of INITIAL_STUDENTS) {
        await setDoc(doc(db, 'students', student.id), student, { merge: true });
      }
      alert("Barcha guruh va o'quvchilar Firebase'ga yuklandi!");
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const filteredStudents = students
    .filter((s) => s.group === selectedGroup)
    .sort((a, b) => (b.coins || 0) - (a.coins || 0));

  const handleCoins = async (id, currentCoins, isAdd) => {
    const val = parseInt(coinInputs[id], 10);
    if (!isNaN(val) && val > 0) {
      const limitedVal = Math.min(5, val);
      const studentRef = doc(db, 'students', id);
      const newCoins = Math.max(0, (currentCoins || 0) + (isAdd ? limitedVal : -limitedVal));

      await updateDoc(studentRef, { coins: newCoins });
      setCoinInputs({ ...coinInputs, [id]: '' });
    }
  };

  const handleAttendanceChange = async (studentId, day, status) => {
    const studentRef = doc(db, 'students', studentId);
    const weekKey = `week_${activeWeek}`;

    await updateDoc(studentRef, {
      [`attendance.${weekKey}.${day}`]: status,
    });
  };

  const addWeek = () => {
    const nextWeek = weeks.length + 1;
    setWeeks([...weeks, nextWeek]);
    setActiveWeek(nextWeek);
  };

  return (
    <div className={`flex h-screen font-sans ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-amber-50/50 text-slate-900'}`}>
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
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition ${
                    selectedGroup === group
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

        <div className="space-y-2">
          <button
            onClick={seedDatabase}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 transition"
          >
            <Database size={16} />
            <span>Bazani to'ldirish</span>
          </button>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm border transition ${
              isDarkMode ? 'border-slate-700 bg-slate-800 text-amber-400' : 'border-amber-300 bg-amber-100 text-slate-800'
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8 flex flex-col justify-between">
        <div>
          <header className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Group {selectedGroup} Attendance</h2>
              <p className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Active Week: Week {activeWeek}</p>
            </div>
          </header>

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
                  const currentAtt = (student.attendance && student.attendance[weekKey]) || {};

                  return (
                    <tr key={student.id} className="hover:bg-slate-800/30">
                      <td className="py-4 px-6 font-medium flex items-center gap-3">
                        <span className="font-semibold text-sm">{student.name}</span>
                      </td>

                      {DAYS.map((day) => {
                        const status = currentAtt[day] || 'none';
                        return (
                          <td key={day} className="py-4 px-2 text-center">
                            <select
                              value={status}
                              onChange={(e) => handleAttendanceChange(student.id, day, e.target.value)}
                              className={`w-10 h-10 rounded-xl font-bold text-xs outline-none cursor-pointer text-center appearance-none border transition ${
                                status === 'present' ? 'bg-emerald-500 text-white border-emerald-600' :
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
                          <span>{student.coins || 0}</span>
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
                            className={`w-16 px-2 py-1.5 rounded-xl text-xs font-semibold outline-none border text-center ${
                              isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-amber-50 border-amber-300 text-slate-900'
                            }`}
                          />
                          <button
                            onClick={() => handleCoins(student.id, student.coins, true)}
                            className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => handleCoins(student.id, student.coins, false)}
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

        <div className="mt-6 flex items-center gap-2 border-t border-slate-800 pt-4">
          <span className="text-xs font-bold text-slate-400 uppercase mr-2">Weeks:</span>
          {weeks.map((w) => (
            <button
              key={w}
              onClick={() => setActiveWeek(w)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeWeek === w
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
          >
            <Plus size={16} />
          </button>
        </div>
      </main>
    </div>
  );
}