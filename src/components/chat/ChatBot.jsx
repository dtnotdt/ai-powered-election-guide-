"use client";
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getChatResponse } from '../../services/chatbot';
import { sanitizeInput } from '../../utils/sanitize';

export default function ChatBot({ setScreen }) {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Namaste! 🙏 I\'m your VoteVerse AI assistant. Ask me anything about voting, elections, or democracy in India!' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    const cleaned = sanitizeInput(input);
    if (!cleaned) return;

    setMessages((prev) => [...prev, { type: 'user', text: cleaned }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getChatResponse(cleaned);
      setMessages((prev) => [...prev, { type: 'bot', text: response }]);
    } catch {
      setMessages((prev) => [...prev, { type: 'bot', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (question) => {
    setInput(question);
    setTimeout(() => {
      setInput(question);
      handleSendWithText(question);
    }, 100);
  };

  const handleSendWithText = async (text) => {
    const cleaned = sanitizeInput(text);
    if (!cleaned) return;

    setMessages((prev) => [...prev, { type: 'user', text: cleaned }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getChatResponse(cleaned);
      setMessages((prev) => [...prev, { type: 'bot', text: response }]);
    } catch {
      setMessages((prev) => [...prev, { type: 'bot', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = [
    'How to register?',
    'What is NOTA?',
    'EVM hack myth',
    'First time voter',
    'Required documents',
  ];

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="text-gradient">AI Assistant</span>
        </h2>
        <p className="section-subtitle">
          Your personal election knowledge companion & myth buster
        </p>
      </div>

      <div className="chat-wrapper">
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-avatar">🤖</div>
            <div className="chat-header-info">
              <h3>VoteVerse AI</h3>
              <p>Election Expert • Myth Buster</p>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg chat-msg-${msg.type}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-msg chat-msg-bot" style={{ opacity: 0.6 }}>
                <span style={{ animation: 'pulse 1s infinite' }}>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          <div className="chat-quick-actions">
            {quickActions.map((action, i) => (
              <button
                key={i}
                className="chat-quick-btn"
                onClick={() => handleQuickAction(action)}
              >
                {action}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <input
              type="text"
              className="input"
              placeholder="Ask me anything about voting..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{ borderRadius: 'var(--radius-full)' }}
              id="chat-input"
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSend}
              disabled={isTyping}
              id="chat-send"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
