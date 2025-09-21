import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Firebase web configuration (public) — updated to your new project
const firebaseConfig = {
  apiKey: "AIzaSyAIvwjFE9keEVzi8FtUeb-OUuJYRYZMwW8",
  authDomain: "scriptlyfy-523d2.firebaseapp.com",
  projectId: "scriptlyfy-523d2",
  storageBucket: "scriptlyfy-523d2.firebasestorage.app",
  messagingSenderId: "697732422339",
  appId: "1:697732422339:web:d4cc0cb69a96f3f4f0a076",
  measurementId: "G-DB6E8ELMG4",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Optional analytics in supported browsers only
if (typeof window !== "undefined") {
  isSupported().then((ok) => {
    if (ok) getAnalytics(app);
  });
}

export const db = getFirestore(app);
export { app };
