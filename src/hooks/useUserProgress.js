/**
 * Custom hook for managing user progress state.
 * Tracks checklist completion, badges, and EVM vote.
 * Persists to localStorage and Firestore.
 */
import { useState, useEffect, useCallback } from 'react';
import { onAuthChange, saveProgress, loadProgress } from '../services/firebase';

const STORAGE_KEY = 'voteverse_progress';

const defaultChecklist = {
  register: false,
  checkId: false,
  findBooth: false,
  vote: false,
};

const defaultBadges = {
  firstStep: false,
  learner: false,
  voter: false,
  expert: false,
};

function loadLocalProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // Ignore parse errors
  }
  return null;
}

export function useUserProgress() {
  const [checklist, setChecklist] = useState(() => loadLocalProgress()?.checklist || defaultChecklist);
  const [badges, setBadges] = useState(() => loadLocalProgress()?.badges || defaultBadges);
  const [evmVote, setEvmVote] = useState(() => loadLocalProgress()?.evmVote || null);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        try {
          const remoteProgress = await loadProgress(authUser.uid);
          if (remoteProgress) {
            setChecklist(prev => ({ ...prev, ...(remoteProgress.checklist || {}) }));
            setBadges(prev => ({ ...prev, ...(remoteProgress.badges || {}) }));
            if (remoteProgress.evmVote) setEvmVote(remoteProgress.evmVote);
          }
        } catch {
          // Firestore unavailable, continue with local data
        }
      } else {
        setUser(null);
      }
      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ checklist, badges, evmVote }));
    } catch {
      // Storage full or unavailable
    }

    if (user && !loadingUser) {
      saveProgress(user.uid, { checklist, badges, evmVote });
    }
  }, [checklist, badges, evmVote, user, loadingUser]);

  const toggleChecklistItem = useCallback((key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const completeChecklistItem = useCallback((key) => {
    setChecklist((prev) => ({ ...prev, [key]: true }));
  }, []);

  const unlockBadge = useCallback((key) => {
    setBadges((prev) => ({ ...prev, [key]: true }));
  }, []);

  // Auto-check expert badge
  useEffect(() => {
    const allComplete = Object.values(checklist).every(Boolean);
    if (allComplete && badges.voter && !badges.expert) {
      setBadges((prev) => ({ ...prev, expert: true }));
    }
  }, [checklist, badges.voter, badges.expert]);

  const progress = (Object.values(checklist).filter(Boolean).length / 4) * 100;

  const resetProgress = useCallback(() => {
    setChecklist(defaultChecklist);
    setBadges(defaultBadges);
    setEvmVote(null);
    localStorage.removeItem(STORAGE_KEY);
    if (user) {
      saveProgress(user.uid, { checklist: defaultChecklist, badges: defaultBadges, evmVote: null });
    }
  }, [user]);

  return {
    checklist,
    setChecklist,
    badges,
    setBadges,
    evmVote,
    setEvmVote,
    toggleChecklistItem,
    completeChecklistItem,
    unlockBadge,
    progress,
    resetProgress,
    user,
    loadingUser,
  };
}
