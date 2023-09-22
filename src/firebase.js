import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDaZE-8FgmCvW4BnxoE5oEF8GDXMrI0y3k",
  authDomain: "expense-tracker-18d1b.firebaseapp.com",
  projectId: "expense-tracker-18d1b",
  storageBucket: "expense-tracker-18d1b.appspot.com",
  messagingSenderId: "1042818657810",
  appId: "1:1042818657810:web:fbe011eac043c62b7932cb",
  measurementId: "G-13J4KMCFCD"
};

export default firebaseConfig;
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

