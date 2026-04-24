/**
 * Firebase service initialization for VoteVerse India.
 * Provides Auth, Firestore, and Analytics setup.
 * Falls back to demo mode when Firebase credentials are not configured.
 */
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { FIREBASE_CONFIG } from '../utils/constants';

let app = null;
let auth = null;
let db = null;
let analytics = null;
let _isDemoMode = false;
let _demoAuthCallbacks = [];
let _demoUser = null;

const googleProvider = new GoogleAuthProvider();

/**
 * Check if Firebase is properly configured with real credentials.
 */
function isFirebaseConfigured() {
  const key = FIREBASE_CONFIG.apiKey;
  return key && key !== 'demo-key' && key.length > 10;
}

/**
 * Initialize Firebase. Safe to call multiple times.
 * Returns demo mode flag if Firebase is not configured.
 */
export function initFirebase() {
  if (_isDemoMode) return { app: null, auth: null, db: null, analytics: null, demoMode: true };
  if (app) return { app, auth, db, analytics, demoMode: false };

  if (!isFirebaseConfigured()) {
    console.warn('⚠️ Firebase not configured — running in demo mode. Auth will use local-only users.');
    _isDemoMode = true;
    return { app: null, auth: null, db: null, analytics: null, demoMode: true };
  }

  try {
    app = initializeApp(FIREBASE_CONFIG);
    auth = getAuth(app);
    db = getFirestore(app);
    if (typeof window !== 'undefined') {
      try {
        analytics = getAnalytics(app);
      } catch {
        // Analytics may fail in some environments
      }
    }
    return { app, auth, db, analytics, demoMode: false };
  } catch (error) {
    console.warn('Firebase initialization failed:', error.message);
    _isDemoMode = true;
    return { app: null, auth: null, db: null, analytics: null, demoMode: true };
  }
}

/**
 * Create a demo user object that mimics Firebase User.
 */
function createDemoUser(type = 'guest') {
  return {
    uid: 'demo-' + Date.now(),
    displayName: type === 'google' ? 'Demo User' : null,
    email: type === 'google' ? 'demo@voteverse.app' : null,
    photoURL: null,
    isAnonymous: type === 'guest',
    _isDemoUser: true,
  };
}

/**
 * Notify all demo auth listeners
 */
function notifyDemoListeners(user) {
  _demoUser = user;
  _demoAuthCallbacks.forEach(cb => cb(user));
}

/**
 * Sign in anonymously for progress tracking.
 */
export async function signInAnon() {
  const { auth: fireAuth, demoMode } = initFirebase();

  if (demoMode) {
    const user = createDemoUser('guest');
    notifyDemoListeners(user);
    return user;
  }

  if (!fireAuth) return null;
  try {
    const result = await signInAnonymously(fireAuth);
    return result.user;
  } catch (error) {
    console.warn('Anonymous sign-in failed:', error.message);
    // Fallback to demo mode
    const user = createDemoUser('guest');
    notifyDemoListeners(user);
    return user;
  }
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle() {
  const { auth: fireAuth, demoMode } = initFirebase();

  if (demoMode) {
    const user = createDemoUser('google');
    notifyDemoListeners(user);
    return user;
  }

  if (!fireAuth) {
    const user = createDemoUser('google');
    notifyDemoListeners(user);
    return user;
  }

  try {
    const result = await signInWithPopup(fireAuth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google sign-in failed:', error.message);
    // If popup blocked or domain not authorized, fall back to demo
    const user = createDemoUser('google');
    notifyDemoListeners(user);
    return user;
  }
}

/**
 * Sign out
 */
export async function logout() {
  const { auth: fireAuth, demoMode } = initFirebase();

  if (demoMode) {
    notifyDemoListeners(null);
    return;
  }

  if (!fireAuth) {
    notifyDemoListeners(null);
    return;
  }

  try {
    await signOut(fireAuth);
  } catch (error) {
    console.error('Error signing out', error);
    notifyDemoListeners(null);
  }
}

/**
 * Subscribe to auth state changes.
 * In demo mode, uses a local callback system.
 */
export function onAuthChange(callback) {
  const { auth: fireAuth, demoMode } = initFirebase();

  if (demoMode) {
    _demoAuthCallbacks.push(callback);
    // Fire immediately with current demo user state
    setTimeout(() => callback(_demoUser), 0);
    return () => {
      _demoAuthCallbacks = _demoAuthCallbacks.filter(cb => cb !== callback);
    };
  }

  if (!fireAuth) {
    setTimeout(() => callback(null), 0);
    return () => {};
  }

  return onAuthStateChanged(fireAuth, callback);
}

/**
 * Save user progress to Firestore.
 */
export async function saveProgress(userId, progressData) {
  const { db: fireDb, demoMode } = initFirebase();
  if (demoMode || !fireDb || !userId) {
    // In demo mode, save to localStorage only (handled by hook)
    return false;
  }

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
  const { db: fireDb, demoMode } = initFirebase();
  if (demoMode || !fireDb || !userId) return null;

  try {
    const snap = await getDoc(doc(fireDb, 'userProgress', userId));
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    console.warn('Failed to load progress:', error.message);
    return null;
  }
}

/**
 * Track an analytics event
 */
export function trackEvent(eventName, eventParams = {}) {
  const { analytics: fireAnalytics } = initFirebase();
  if (fireAnalytics) {
    logEvent(fireAnalytics, eventName, eventParams);
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
        return true;
      }
    }
  } catch (error) {
    console.warn('Messaging setup failed:', error.message);
  }
  return false;
}
