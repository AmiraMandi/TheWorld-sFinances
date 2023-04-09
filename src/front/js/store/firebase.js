// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHJf53CveGTu7ospOriAF-gTe2ovPPGw8",
  authDomain: "the-world-s-finances.firebaseapp.com",
  projectId: "the-world-s-finances",
  storageBucket: "the-world-s-finances.appspot.com",
  messagingSenderId: "381591223100",
  appId: "1:381591223100:web:b1caa1dc910fa2c50afc39",
  measurementId: "G-BF3MCS640J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};