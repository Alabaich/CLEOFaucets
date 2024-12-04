// src/utils/firebaseConfig.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import getAuth


const firebaseConfig = {
    apiKey: "AIzaSyCHtXcfASsjhQ0Tu_mIEgIJ5W87YLe4RCc",
    authDomain: "cleo-plumbing.firebaseapp.com",
    databaseURL: "https://cleo-plumbing-default-rtdb.firebaseio.com",
    projectId: "cleo-plumbing",
    storageBucket: "cleo-plumbing.firebasestorage.app",
    messagingSenderId: "220971281324",
    appId: "1:220971281324:web:0f6b323508d15e42232809",
    measurementId: "G-8ZKYRXJZC8"
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app); 

export let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((error) => {
      console.warn("Analytics initialization failed:", error);
    });
}