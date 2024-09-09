// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDtQZfUwc32jioTJ6WPRN8-rGiLxzfWI5A",
  authDomain: "eten-57e5b.firebaseapp.com",
  projectId: "eten-57e5b",
  storageBucket: "eten-57e5b.appspot.com",
  messagingSenderId: "760773061267",
  appId: "1:760773061267:web:6fb891852100d445a83b66",
  measurementId: "G-K6Y4HCEXP1"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
