import { initializeApp } from 'firebase/app';
import { 
  initializeAuth, 
  getReactNativePersistence, 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyDtQZfUwc32jioTJ6WPRN8-rGiLxzfWI5A",
  authDomain: "eten-57e5b.firebaseapp.com",
  projectId: "eten-57e5b",
  storageBucket: "eten-57e5b.appspot.com",
  messagingSenderId: "760773061267",
  appId: "1:760773061267:web:6fb891852100d445a83b66",
  measurementId: "G-K6Y4HCEXP1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Login function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Register function
export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error.message;
  }
};

// Forgot password function
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Password reset email sent!' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Logout function
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true, message: 'Logged out successfully' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Listen for authentication state changes
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
