// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyB0W7QUYZTasoEubQ7VofxNqN3NPMjNbxo",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "anphero-inmobiliaria-database.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "anphero-inmobiliaria-database",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "anphero-inmobiliaria-database.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "904388407957",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:904388407957:web:e51731540b77c8a72d219c",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-W844GYSVT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Configuración para desarrollo local
if (process.env.NODE_ENV === 'development') {
  // Configurar Firestore para desarrollo local
  import('firebase/firestore').then(({ enableNetwork, connectFirestoreEmulator }) => {
    // Asegurar que la conexión esté habilitada
    enableNetwork(db).catch(console.error);
  });
}

export default app;
