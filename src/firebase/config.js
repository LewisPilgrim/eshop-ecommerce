import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "esop-b3e80.firebaseapp.com",
  projectId: "esop-b3e80",
  storageBucket: "buckets/esop-b3e80.appspot.com",
  messagingSenderId: "225495834073",
  appId: "1:225495834073:web:8585a14abf9fd18784cdc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app