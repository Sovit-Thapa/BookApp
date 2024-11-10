import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAIxM9aiaAE_SNpiVtxVmGK8-Ubp7_QTIo",
  authDomain: "lab03bookapp.firebaseapp.com",
  projectId: "lab03bookapp",
  storageBucket: "lab03bookapp.firebasestorage.app",
  messagingSenderId: "759456495457",
  appId: "1:759456495457:web:dd152452067941c6023720",
  measurementId: "G-5MWM1W4S85"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };