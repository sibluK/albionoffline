// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6wDWY_kLKXtzii-_qAviqt6rOElvqa4M",
  authDomain: "albionoffline-556c5.firebaseapp.com",
  projectId: "albionoffline-556c5",
  storageBucket: "albionoffline-556c5.appspot.com",
  messagingSenderId: "679679874048",
  appId: "1:679679874048:web:6c3349ef8c2e364006b4e5",
  measurementId: "G-D57QQ1NJVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };