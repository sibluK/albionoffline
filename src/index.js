// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6wDWY_kLKXtzii-_qAviqt6rOElvqa4M",
  authDomain: "albionoffline-556c5.firebaseapp.com",
  projectId: "albionoffline-556c5",
  storageBucket: "albionoffline-556c5.appspot.com",
  messagingSenderId: "679679874048",
  appId: "1:679679874048:web:6c3349ef8c2e364006b4e5",
  measurementId: "G-D57QQ1NJVC"
};

// Initialize Firebase before rendering the app
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Start measuring performance in your app
reportWebVitals();