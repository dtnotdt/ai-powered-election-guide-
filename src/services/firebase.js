/**
 * Firebase service initialization for VoteVerse India.
 * Provides Auth, Firestore, and Messaging setup.
 */
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { FIREBASE_CONFIG } from '../utils/constants';

let app = null;
let auth = null;
let db = null;

/**
 * Initialize Firebase. Safe to call multiple times.
 */
export function initFirebase() {
  if (app) return { app, auth, db };

  try {
    app = initializeApp(FIREBASE_CONFIG);
    auth = getAuth(app);
    db = getFirestore(app);
    return { app, auth, db };
  } catch (error) {
    console.warn('Firebase initialization failed:', error.message);
    return { app: null, auth: null, db: null };
  }
}

/**
 * Sign in anonymously for progress tracking.
 */
export async function signInAnon() {
  const { auth: fireAuth } = initFirebase();
  if (!fireAuth) return null;

  try {
    const result = await signInAnonymously(fireAuth);
    return result.user;
  } catch (error) {
    console.warn('Anonymous sign-in failed:', error.message);
    return null;
  }
}

/**
 * Subscribe to auth state changes.
 */
export function onAuthChange(callback) {
  const { auth: fireAuth } = initFirebase();
  if (!fireAuth) return () => {};
  return onAuthStateChanged(fireAuth, callback);
}

/**
 * Save user progress to Firestore.
 */
export async function saveProgress(userId, progressData) {
  const { db: fireDb } = initFirebase();
  if (!fireDb || !userId) return false;

  try {
    await setDoc(doc(fireDb, 'userProgress', userId), {
      ...progressData,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn('Failed to save progress:', error.message);
    return false;
  }
}

/**
 * Load user progress from Firestore.
 */
export async function loadProgress(userId) {
  const { db: fireDb } = initFirebase();
  if (!fireDb || !userId) return null;

  try {
    const snap = await getDoc(doc(fireDb, 'userProgress', userId));
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    console.warn('Failed to load progress:', error.message);
    return null;
  }
}

/**
 * Setup Firebase Cloud Messaging (mock/basic).
 * In production, requires a valid VAPID key and service worker.
 */
export async function setupMessaging() {
  try {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted');
        // In production: get FCM token and register with server
        return true;
      }
    }
  } catch (error) {
    console.warn('Messaging setup failed:', error.message);
  }
  return false;
}
