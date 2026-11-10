import { getApps, initializeApp } from "firebase/app";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export const firebaseApp =
  getApps()[0] ??
  initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId,
    storageBucket: `${projectId}.firebasestorage.app`,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
