// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo85Dov-08wFJ26DejaHSheGaQCtntnUA",
  authDomain: "mini-social-app-7adb7.firebaseapp.com",
  projectId: "mini-social-app-7adb7",
  storageBucket: "mini-social-app-7adb7.firebasestorage.app",
  messagingSenderId: "512248676363",
  appId: "1:512248676363:web:593cba9835d3d873ee070e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth