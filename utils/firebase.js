import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAZdedLrO3-G9F7NrHS-_WzdPo1SxL17No",
  authDomain: "restaurants-4b33e.firebaseapp.com",
  projectId: "restaurants-4b33e",
  storageBucket: "restaurants-4b33e.appspot.com",
  messagingSenderId: "519478688009",
  appId: "1:519478688009:web:90d9eaba7d21a361d4bbd8"
};


export const firebaseApp = initializeApp(firebaseConfig);
