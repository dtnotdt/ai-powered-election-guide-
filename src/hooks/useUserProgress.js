/**
 * Custom hook for managing user progress state.
 * Tracks checklist completion, badges, and EVM vote.
 * Persists to localStorage for session continuity.
 */
import { useState, useEffect, useCallback } from 'react';

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

function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // Ignore parse errors
  }
  return null;
}

export function useUserProgress() {
  const stored = loadProgress();

  const [checklist, setChecklist] = useState(stored?.checklist || defaultChecklist);
  const [badges, setBadges] = useState(stored?.badges || defaultBadges);
  const [evmVote, setEvmVote] = useState(stored?.evmVote || null);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ checklist, badges, evmVote }));
    } catch {
      // Storage full or unavailable
    }
  }, [checklist, badges, evmVote]);

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
    if (allComplete && badges.voter) {
      setBadges((prev) => ({ ...prev, expert: true }));
    }
  }, [checklist, badges.voter]);

  const progress = (Object.values(checklist).filter(Boolean).length / 4) * 100;

  const resetProgress = useCallback(() => {
    setChecklist(defaultChecklist);
    setBadges(defaultBadges);
    setEvmVote(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

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
  };
}
