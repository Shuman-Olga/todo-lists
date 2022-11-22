// Импорт функции из необходимых SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/**
 *Firebase
 */
// Конфигурация Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDpfSwrKqCavkn1R3RPvLfhbmQWd5eRJT8',
  authDomain: 'todo-lists-306a0.firebaseapp.com',
  projectId: 'todo-lists-306a0',
  storageBucket: 'todo-lists-306a0.appspot.com',
  messagingSenderId: '688302635075',
  appId: '1:688302635075:web:8820723974793dbdd67cf6',
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
