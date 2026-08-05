import { create } from 'zustand';

const z11Names = [
  "Mahmudova Mohinur", "Alisherov Bilol", "Mamasaliyeva Zarina", "Alimqulov Ehrombek",
  "Xusanova Munavvar", "Mo'minova Marjona", "O'rinboyev Muhammadyusuf", "Olimova Dilbar",
  "Abduvohidova Jasmina", "Xasanboyeva E'zoza", "Abduazimov Abdulaziz", "Shayzoqov Sahobiddin",
  "Rustamova Zulfizar", "Eliboyev Umidjon", "Qo'chqorov Abubakr", "Alijonova Lobar",
  "Rahmatullayeva Zahro", "Niyozova Muxlisa", "Tursunova Zahro", "Azimov Umidjon",
  "Nosirqulov Burxonali", "Mahmudova Charos", "Holbo’tayeva Fotima", "Holbo’tayeva Zuhra",
  "Berdiqulov Asilbek", "Mamaraimova Ra'no", "Xayrullayev Jamoliddin", "Obidova Gulasal",
  "Norbekova Dilnura", "Bo’ronboyev Davlat", "Aliyeva Sabrina"
];

const z13Names = [
  "Mirzajonov Firdavs", "Jabborova Zarina", "Shaxobiddinova Laziza", "Ochilova Hurshida",
  "Akromov Elyor", "Raimjonov Umidjon", "Shomirzayev Xusrav", "Kutfiddinova Malika",
  "Raimjonov Dilyorbek", "Baxtiyorov Boymirza", "Abdurashidov Ma’ruf", "Berdiyorova Muborak",
  "Jumaboyeva Sarvinoz", "Isoqulova Aziza", "Xudoyberdiyeva Aziza", "Yo'ldashaliyev Jahongir",
  "Safarova Mohinur", "Ablazizov Shaxriyor", "Nazarqulova Gulsanam", "Qudratova Mohinur",
  "Amirova Dilshoda", "Raxmatullayev Husan"
];

const z14Names = [
  "Abdurahimova Sarvinoz", "Yagafarov Rashid", "Abduhoshimov Kamron", "Kuliyeva Mashhura",
  "Tolibjonova Diyora", "Allayorova Mushtariybonu", "Abdusodiqov Sanjar", "Samadova Nigora",
  "Akromjonov Inomjon", "Abduqahharov Firdavs", "Umarov Eldor", "Turobjonova Pokiza",
  "Rahmatullayev Abdulloh", "Nazarqulov Muhammadjon", "Haydarqulova Madina", "Dilovarxonova Nigora",
  "Soatov Ozodbek", "Isoqjonov Sardor", "Isoqjonov Ibroxim", "Irisqulov Abror",
  "Jo'rayeva Munisa", "Temirova Mushtariybonu", "Toshpo'latova Fazilat", "Abdug'ofurrov Asilbek",
  "Nazarqulova Shahzoda", "Norboyeva Parizoda", "Abdunabiyeva Sabina", "Ulug'bekova Sarvinoz",
  "Xudoyberdiyev Nazarbek", "Boytemirova Zulfiya", "Farhodova Shaxlo", "Xasanov Bexruz",
  "Xasanov Begzod", "Qurbonboyeva Oydin"
];

const initialStudents = [
  ...z11Names.map((name, i) => ({ id: `z11_${i + 1}`, name, group: 'Z11', coins: 0, attendance: {} })),
  ...z13Names.map((name, i) => ({ id: `z13_${i + 1}`, name, group: 'Z13', coins: 0, attendance: {} })),
  ...z14Names.map((name, i) => ({ id: `z14_${i + 1}`, name, group: 'Z14', coins: 0, attendance: {} }))
];

const savedUser = JSON.parse(localStorage.getItem('ziyo_user') || 'null');

export const useAppStore = create((set) => ({
  selectedGroup: 'Z11',
  groups: ['Z11', 'Z13', 'Z14'],
  isDarkMode: true,
  currentUser: savedUser,
  activeWeek: 1,
  weeks: [1],
  students: initialStudents,

  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setSelectedGroup: (groupName) => set({ selectedGroup: groupName }),
  setActiveWeek: (weekNum) => set({ activeWeek: weekNum }),

  addWeek: () => set((state) => {
    const nextWeek = state.weeks.length + 1;
    return { weeks: [...state.weeks, nextWeek], activeWeek: nextWeek };
  }),

  setAttendance: (studentId, day, status) => set((state) => ({
    students: state.students.map((student) => {
      if (student.id === studentId) {
        const weekKey = `week_${state.activeWeek}`;
        const currentWeekAtt = student.attendance[weekKey] || {};
        return {
          ...student,
          attendance: {
            ...student.attendance,
            [weekKey]: { ...currentWeekAtt, [day]: status }
          }
        };
      }
      return student;
    })
  })),

  updateCoins: (studentId, amount) => set((state) => {
    const clampedAmount = Math.max(-5, Math.min(5, amount));
    return {
      students: state.students.map((student) => {
        if (student.id === studentId) {
          return { ...student, coins: Math.max(0, student.coins + clampedAmount) };
        }
        return student;
      })
    };
  }),

  loginUser: (role, userData) => {
    const user = { role, ...userData };
    localStorage.setItem('ziyo_user', JSON.stringify(user));
    set({ currentUser: user });
  },

  logoutUser: () => {
    localStorage.removeItem('ziyo_user');
    set({ currentUser: null });
  }
}));