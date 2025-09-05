// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { devLog } from '../utils/logger';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

devLog('Firebase configurado:', {
  projectId: firebaseConfig.projectId,
  environment: process.env.NODE_ENV
});

// Configuración para desarrollo local
if (process.env.NODE_ENV === 'development') {
  devLog('Configurando Firebase para desarrollo...');
  // Configurar Firestore para desarrollo local
  import('firebase/firestore').then(({ enableNetwork, connectFirestoreEmulator }) => {
    // Asegurar que la conexión esté habilitada
    enableNetwork(db).then(() => {
      devLog('Conexión a Firestore habilitada');
    }).catch(console.error);
  });
  
  // Configurar Storage para desarrollo local
  import('firebase/storage').then(({ connectStorageEmulator }) => {
    // Configurar Storage para desarrollo local si es necesario
    // connectStorageEmulator(storage, 'localhost', 9199);
  });
}

export default app;
