"use client";
import { motion } from 'framer-motion';
import { useSpeech } from '../../hooks/useSpeech';
import { getChatResponse } from '../../services/chatbot';
import { useState } from 'react';

export default function VoiceAssistant({ setScreen }) {
  const { listening, transcript, startListening, speak, setTranscript } = useSpeech();
  const [response, setResponse] = useState('');

  const handleVoiceClick = async () => {
    if (listening) return;

    startListening();

    // Wait for transcript via a check
    setTimeout(async () => {
      // The transcript will be set by the speech hook
      // For the response, we'll use the chatbot service
    }, 3000);
  };

  // Process transcript when it changes
  const handleProcessTranscript = async () => {
    if (!transcript || transcript.includes('not supported') || transcript.includes('try again')) {
      setResponse(transcript);
      return;
    }

    try {
      const botResponse = await getChatResponse(transcript);
      setResponse(botResponse);
      speak(botResponse.substring(0, 200)); // Speak first 200 chars
    } catch {
      setResponse('Sorry, I couldn\'t process that. Please try again.');
    }
  };

  // Trigger processing when transcript updates
  if (transcript && !listening && !response) {
    handleProcessTranscript();
  }

  const handleReset = () => {
    setTranscript('');
    setResponse('');
  };

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="text-gradient">Voice Guide</span>
        </h2>
        <p className="section-subtitle">
          Tap the microphone and ask your election question
        </p>
      </div>

      <div className="voice-wrapper">
        <motion.button
          className={`voice-orb ${listening ? 'listening' : ''}`}
          onClick={handleVoiceClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={listening ? 'Listening...' : 'Tap to speak'}
          id="voice-orb-btn"
        >
          🎤
        </motion.button>

        <div className="voice-status">
          {listening ? '🔴 Listening...' : 'Tap to speak'}
        </div>

        {/* Transcript */}
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card voice-output"
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              You said:
            </div>
            <div style={{ color: 'var(--color-text-primary)', fontSize: '1rem', fontWeight: 500 }}>
              "{transcript}"
            </div>
          </motion.div>
        )}

        {/* Response */}
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{ padding: 'var(--space-xl)', maxWidth: '500px', width: '100%', textAlign: 'left', marginTop: 'var(--space-md)' }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--color-saffron)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Response:
            </div>
            <div style={{ color: 'var(--color-text-primary)', fontSize: '0.9rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
              {response}
            </div>
          </motion.div>
        )}

        {(transcript || response) && (
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 'var(--space-lg)' }} onClick={handleReset}>
            🔄 Ask Another
          </button>
        )}

        {/* Suggestions */}
        <motion.div
          className="glass-card"
          style={{ marginTop: 'var(--space-3xl)', padding: 'var(--space-xl)', maxWidth: '500px', width: '100%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Try asking:
          </h3>
          <div style={{ color: 'var(--color-text-secondary)', lineHeight: 2, fontSize: '0.9rem' }}>
            🗣️ "Where is my polling booth?"<br />
            🗣️ "How do I register to vote?"<br />
            🗣️ "What documents do I need?"<br />
            🗣️ "Explain EVM and VVPAT"
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
