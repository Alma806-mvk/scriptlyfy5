import { initializeApp, getApp, getApps } from "firebase/app";
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

// Analytics deliberately deferred (see firebaseAnalytics.ts) to avoid pulling
// analytics code in the first Firestore interaction bundle. This keeps the
// initial dynamic import (triggered on user intent) slimmer; analytics will be
// loaded only after a successful conversion or when explicitly requested.

export const db = getFirestore(app);
export { app };
