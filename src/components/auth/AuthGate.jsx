"use client";
/**
 * AuthGate — Firebase Authentication entry point.
 * No user can access the app without signing in.
 * Supports Google sign-in and anonymous guest access.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithGoogle, signInAnon } from '../../services/firebase';

export default function AuthGate({ loadingUser }) {
  const [error, setError] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  const handleGoogle = async () => {
    setError('');
    setSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
      console.error(err);
    } finally {
      setSigningIn(false);
    }
  };

  const handleGuest = async () => {
    setError('');
    setSigningIn(true);
    try {
      await signInAnon();
    } catch (err) {
      setError('Guest access failed. Please try again.');
      console.error(err);
    } finally {
      setSigningIn(false);
    }
  };

  // Loading state while Firebase resolves session
  if (loadingUser) {
    return (
      <div className="auth-gate">
        <motion.div
          className="auth-loader"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className="auth-gate">
      {/* Ambient */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>
      <div className="noise-overlay" aria-hidden="true" />

      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo / Branding */}
        <div className="auth-brand">
          <div className="auth-brand-icon">🗳️</div>
          <h1 className="auth-brand-title">
            <span className="text-gradient-tricolor">VoteVerse</span>
            {' '}India
          </h1>
          <p className="auth-brand-tagline">
            Your cinematic journey through the world's largest democracy
          </p>
        </div>

        {/* Sign-in options */}
        <div className="auth-actions">
          <button
            className="auth-btn auth-btn-google"
            onClick={handleGoogle}
            disabled={signingIn}
            id="auth-google-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {signingIn ? 'Signing in…' : 'Continue with Google'}
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button
            className="auth-btn auth-btn-guest"
            onClick={handleGuest}
            disabled={signingIn}
            id="auth-guest-btn"
          >
            👤 Continue as Guest
          </button>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            className="auth-error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Trust footer */}
        <div className="auth-footer">
          <span className="auth-trust-label">🔒 Educational</span>
          <span className="auth-trust-label">🛡️ Secure</span>
          <span className="auth-trust-label">🇮🇳 Made for India</span>
        </div>
      </motion.div>
    </div>
  );
}
