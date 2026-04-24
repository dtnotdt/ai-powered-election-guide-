"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, ChevronRight, Info } from "lucide-react";

// Mock Data representing contextual queries
const ASSISTANT_KNOWLEDGE = {
  registration: [
    { id: "q1", query: "Am I eligible to vote?", answer: "You must be an Indian citizen, 18 years of age on the qualifying date (usually Jan 1st), and ordinarily resident in the polling area." },
    { id: "q2", query: "How to register online?", answer: "Visit the Voters' Services Portal (voters.eci.gov.in) and fill out Form 6. You will need proof of age and proof of residence." },
  ],
  nomination: [
    { id: "q3", query: "What is an affidavit?", answer: "An affidavit (Form 26) is a legal document where candidates must declare their criminal records, assets, liabilities, and educational qualifications." },
    { id: "q4", query: "Where to view candidate info?", answer: "You can view candidate affidavits on the official ECI KYC (Know Your Candidate) app or website." },
  ],
  campaign: [
    { id: "q5", query: "What is MCC?", answer: "The Model Code of Conduct (MCC) is a set of guidelines issued by the ECI to regulate political parties and candidates prior to elections." },
    { id: "q6", query: "How to report violations?", answer: "You can report MCC violations anonymously using the ECI's cVIGIL mobile application." },
  ],
  polling: [
    { id: "q7", query: "What ID is accepted?", answer: "If you don't have an EPIC (Voter ID), you can use 12 other approved IDs including Aadhaar, Passport, Driving License, or PAN Card." },
    { id: "q8", query: "Find my booth", answer: "You can locate your polling booth via the ECI portal by entering your EPIC number or searching by your personal details." },
  ],
  results: [
    { id: "q9", query: "When are results declared?", answer: "Results are typically declared on a scheduled counting day, days or weeks after the final phase of polling concludes." },
    { id: "q10", query: "What is VVPAT counting?", answer: "VVPAT paper slips are matched with EVM counts in randomly selected polling stations to ensure the integrity of the electronic count." },
  ],
};

export default function ContextualAssistant({ activeStageId = "polling" }) {
  const [activeQuery, setActiveQuery] = useState(null);

  const currentQuestions = ASSISTANT_KNOWLEDGE[activeStageId] || [];

  // Reset active query when stage changes
  useEffect(() => {
    setActiveQuery(null);
  }, [activeStageId]);

  return (
    <section 
      aria-labelledby="assistant-heading"
      className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-md overflow-hidden"
    >
      {/* Header */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center gap-3">
        <Bot className="w-5 h-5 text-blue-500" aria-hidden="true" />
        <h2 id="assistant-heading" className="text-sm font-semibold text-slate-200 tracking-wide uppercase">
          Contextual Assistant
        </h2>
      </div>

      <div className="p-6 flex flex-col gap-6 flex-1">
        <p className="text-sm text-slate-400">
          Select a topic below to learn more about the current election stage.
        </p>

        {/* Action Pills */}
        <div className="flex flex-wrap gap-3" role="list" aria-label="Suggested questions">
          {currentQuestions.map((q) => (
            <button
              key={q.id}
              onClick={() => setActiveQuery(q)}
              aria-expanded={activeQuery?.id === q.id}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors outline-none
                focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
                ${activeQuery?.id === q.id 
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/50" 
                  : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-slate-100"
                }
              `}
            >
              {q.query}
            </button>
          ))}
        </div>

        {/* Answer Card */}
        <AnimatePresence mode="wait">
          {activeQuery ? (
            <motion.div
              key={activeQuery.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-auto p-5 bg-slate-800/50 border border-slate-700 rounded-md flex gap-4"
              role="region"
              aria-live="polite"
            >
              <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-2">
                <h3 className="text-slate-200 font-medium text-sm">{activeQuery.query}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {activeQuery.answer}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="mt-auto p-5 border border-dashed border-slate-700 rounded-md flex items-center justify-center text-slate-500 text-sm">
              Waiting for your question...
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
