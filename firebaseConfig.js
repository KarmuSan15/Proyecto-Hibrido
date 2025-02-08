import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA3vXG45AKSHA-DcI1BjvvBSe6Tgr-QgtA",
  authDomain: "proyectohibridos-1efb7.firebaseapp.com",
  projectId: "proyectohibridos-1efb7",
  storageBucket: "proyectohibridos-1efb7.appspot.com",
  messagingSenderId: "22405540985",
  appId: "1:22405540985:web:e01e2901896f07d0b0b8a8",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


console.log("✅ Firebase conectado correctamente");

export { db, collection, addDoc };
