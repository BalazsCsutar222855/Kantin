import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtQZfUwc32jioTJ6WPRN8-rGiLxzfWI5A",
  authDomain: "eten-57e5b.firebaseapp.com",
  projectId: "eten-57e5b",
  storageBucket: "eten-57e5b.appspot.com",
  messagingSenderId: "760773061267",
  appId: "1:760773061267:web:6fb891852100d445a83b66",
  measurementId: "G-K6Y4HCEXP1"
};

// Initialize Firebase only once
app = initializeApp(firebaseConfig);

// Make sure Firebase services are initialized
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
