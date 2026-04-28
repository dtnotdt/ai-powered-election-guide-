"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Users, Vote, Trophy, CheckSquare } from "lucide-react";

const STAGES = [
  {
    id: "registration",
    title: "Voter Registration",
    icon: Users,
    description: "Ensure your name is on the electoral roll to be eligible to vote.",
    checklist: ["Check NVSP portal", "Fill Form 6 if unregistered", "Verify EPIC details"],
  },
  {
    id: "nomination",
    title: "Candidate Nomination",
    icon: Calendar,
    description: "Candidates file their affidavits disclosing assets and criminal records.",
    checklist: ["Review candidate affidavits", "Understand constituency profiles"],
  },
  {
    id: "campaign",
    title: "Election Campaign",
    icon: MapPin,
    description: "Parties release manifestos and campaign according to the Model Code of Conduct.",
    checklist: ["Read party manifestos", "Attend local town halls", "Report MCC violations"],
  },
  {
    id: "polling",
    title: "Polling Day",
    icon: Vote,
    description: "Cast your vote securely using the Electronic Voting Machine (EVM).",
    checklist: ["Carry accepted Photo ID", "Find your polling booth", "Verify VVPAT slip"],
  },
  {
    id: "results",
    title: "Counting & Results",
    icon: Trophy,
    description: "Votes are counted under strict supervision and results are declared.",
    checklist: ["Follow ECI official updates", "Respect the democratic mandate"],
  },
];

export default function ElectionJourneyMap({ activeStageId, onNodeSelect }) {
  const [internalActive, setInternalActive] = useState(activeStageId ?? "registration");

  const handleSelect = (id) => {
    setInternalActive(id);
    if (onNodeSelect) onNodeSelect(id);
  };

  const activeIndex = STAGES.findIndex((s) => s.id === internalActive);

  return (
    <div className="relative pl-6 py-4" role="navigation" aria-label="Election Journey Timeline">
      {/* Subway Line (Vertical) */}
      <div className="absolute left-[39px] top-8 bottom-8 w-1 bg-slate-800 rounded-full" aria-hidden="true" />

      <div className="space-y-8">
        {STAGES.map((stage, index) => {
          const isActive = internalActive === stage.id;
          const isPast = activeIndex > index;
          const Icon = stage.icon;

          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-start w-full">
              <button
                onClick={() => handleSelect(stage.id)}
                aria-expanded={isActive}
                aria-controls={`stage-content-${stage.id}`}
                className="flex items-center gap-6 group outline-none w-full text-left"
              >
                {/* Node Marker */}
                <div
                  className={`
                    w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-all duration-300
                    ring-4 ring-slate-950 group-focus-visible:ring-blue-500 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-slate-950
                    ${isActive ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" : 
                      isPast ? "bg-slate-700 text-slate-300" : "bg-slate-800 text-slate-500 group-hover:bg-slate-700"}
                  `}
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Node Title */}
                <h3 className={`text-lg font-semibold tracking-wide transition-colors ${isActive ? "text-blue-400" : "text-slate-300 group-hover:text-slate-100"}`}>
                  {stage.title}
                </h3>
              </button>

              {/* Expandable Content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    id={`stage-content-${stage.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden w-full pl-18 pr-4"
                  >
                    <div className="mt-4 mb-2 p-5 bg-slate-800/50 border border-slate-700/50 rounded-md">
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        {stage.description}
                      </p>
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Required Actions</h4>
                        <ul className="space-y-2">
                          {stage.checklist.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                              <CheckSquare className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
