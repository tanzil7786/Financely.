// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQTwn4eAg0YXRR2Q-HQJuc848-e1PfXBA",
  authDomain: "financely-268f6.firebaseapp.com",
  projectId: "financely-268f6",
  storageBucket: "financely-268f6.appspot.com",
  messagingSenderId: "82482292192",
  appId: "1:82482292192:web:e2ec6163a34d2178f1b785",
  measurementId: "G-SVKV5JK6DZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
