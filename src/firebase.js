import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbu0XTp9hjFwvJEeJlWrtpEyeltdePbvg",
  authDomain: "ziyo-education-60fcf.firebaseapp.com",
  projectId: "ziyo-education-60fcf",
  storageBucket: "ziyo-education-60fcf.firebasestorage.app",
  messagingSenderId: "133117782574",
  appId: "1:133117782574:web:4dc1e4489e7eed4083cdbf",
  measurementId: "G-YST2D8M8CW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);