import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Expects a service-account JSON path in GOOGLE_APPLICATION_CREDENTIALS,
// or the individual FIREBASE_* vars below. Not yet called from anywhere —
// wire it up once the compose flow needs to persist briefs or results.
function ensureApp() {
  if (getApps().length) return;
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export function getDb() {
  ensureApp();
  return getFirestore();
}
