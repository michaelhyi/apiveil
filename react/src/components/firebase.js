import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADAY-Nw87uokPGLvmHAqezcWkVCLAyl7U",
  authDomain: "apiveil.firebaseapp.com",
  projectId: "apiveil",
  storageBucket: "apiveil.firebasestorage.app",
  messagingSenderId: "609915737045",
  appId: "1:609915737045:web:6598236456b4790e03e35c",
  measurementId: "G-8X1SQF4D25"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
