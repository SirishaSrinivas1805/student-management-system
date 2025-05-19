import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "./firebaseConfig";

// Sign up
export const register = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const update = async (auth, email) => {
  return sendPasswordResetEmail(auth.user, email);
};

// Login
export const login = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logout = async () => {
  return signOut(auth);
};

// Update DisplayName
export const updateName = async (name) => {
  const user = auth.currentUser;
  if (user) {
    return updateProfile(user, { displayName: name });
  } else {
    throw new Error("No authenticated user found");
  }
};