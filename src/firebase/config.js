import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAVNRv4b46rRxqd9S5lVMXs1FWu8U3eQNE",
  authDomain: "esop-b3e80.firebaseapp.com",
  projectId: "esop-b3e80",
  storageBucket: "esop-b3e80.appspot.com",
  messagingSenderId: "225495834073",
  appId: "1:225495834073:web:8585a14abf9fd18784cdc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app