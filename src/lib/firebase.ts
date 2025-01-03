import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBuN2vYMvCGR9o1aw1KNgZyqyXLLt3GkJg",
  authDomain: "online-clipboard-3b8d7.firebaseapp.com",
  databaseURL: "https://online-clipboard-3b8d7-default-rtdb.firebaseio.com",
  projectId: "online-clipboard-3b8d7",
  storageBucket: "online-clipboard-3b8d7.appspot.com",
  messagingSenderId: "862088953175",
  appId: "1:862088953175:web:ab0783e0fd4be329d35212"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);