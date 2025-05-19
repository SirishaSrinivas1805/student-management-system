import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDc3AYRWZNAYVH5qGEez6qICFhAtt6Ezcw",
  authDomain: "student-management-syste-ac689.firebaseapp.com",
  projectId: "student-management-syste-ac689",
  storageBucket: "student-management-syste-ac689.firebasestorage.app",
  messagingSenderId: "567664377811",
  appId: "1:567664377811:web:4d71114a452b649b0ef926",
  measurementId: "G-31943P4E5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);