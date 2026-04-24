'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useElectionJourney } from '@/context/election-journey-context';
import { SuggestionChips } from './suggestion-chips';
import { AssistantErrorBoundary } from '../error-boundary/assistant-error-boundary';
import type { SuggestionChip } from '@/types/election';

const PanelContent: React.FC = () => {
  const { activePhaseId, getPhaseById } = useElectionJourney();
  const [selectedChip, setSelectedChip] = useState<SuggestionChip | null>(null);

  const activePhase = getPhaseById(activePhaseId);

  useEffect(() => {
    setSelectedChip(null);
  }, [activePhaseId]);

  if (!activePhase) {
    return (
      <div className="p-6 text-center text-slate-400">
        <p className="text-sm">Phase data unavailable</p>
      </div>
    );
  }

  return (
    <motion.div
      key={activePhase.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-full flex flex-col"
    >
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <div className="w-6 h-6 rounded bg-emerald-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-100">{activePhase.title}</h2>
            {activePhase.deadline && (
              <p className="text-xs text-slate-400 mt-1">Deadline: {activePhase.deadline}</p>
            )}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <p className="text-sm text-slate-300 leading-relaxed">{activePhase.description}</p>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-200 leading-relaxed">{activePhase.longDescription}</p>
          </div>

          {activePhase.keyPoints.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Key Points
              </h3>
              <ul className="space-y-2">
                {activePhase.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-slate-300">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500/60 mt-1.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t border-slate-800">
        <div>
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-3">
            Suggested Topics
          </h3>
          <SuggestionChips
            chips={activePhase.suggestedQueries}
            onChipClick={setSelectedChip}
          />
        </div>

        {selectedChip && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
          >
            <p className="text-xs font-semibold text-emerald-300 mb-2">{selectedChip.label}</p>
            <p className="text-sm text-slate-300">
              {selectedChip.description || 'More information coming soon.'}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const ContextualAssistantPanel: React.FC = () => {
  return (
    <AssistantErrorBoundary>
      <div className="h-full flex flex-col bg-slate-900 rounded-lg border border-slate-800 p-6">
        <PanelContent />
      </div>
    </AssistantErrorBoundary>
  );
};