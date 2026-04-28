"use client";

import { useState, useRef } from "react";
import { User, CheckCircle2 } from "lucide-react";

export const PERSONAS = [
  { id: "first-time", label: "First-Time Voter", icon: User },
  { id: "returning", label: "Returning Voter", icon: User },
  { id: "nri", label: "NRI (Overseas)", icon: User },
];

export default function PersonaSelector({ onSelect, initialId = "first-time" }) {
  const [selectedId, setSelectedId] = useState(initialId);
  const buttonRefs = useRef([]);

  const handleSelect = (id) => {
    setSelectedId(id);
    onSelect?.(id);
  };

  const handleKeyDown = (e, index) => {
    let nextIndex = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % PERSONAS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + PERSONAS.length) % PERSONAS.length;
    }

    if (nextIndex !== index) {
      const nextId = PERSONAS[nextIndex].id;
      handleSelect(nextId);
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Select Voter Persona"
      className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-900 border border-slate-800 rounded-md shadow-sm"
    >
      {PERSONAS.map((persona, index) => {
        const Icon = persona.icon;
        const isSelected = selectedId === persona.id;

        return (
          <button
            key={persona.id}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            aria-label={`Select ${persona.label} persona`}
            onClick={() => handleSelect(persona.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`
              flex-1 relative flex items-center justify-center gap-3 px-6 py-4 rounded-md transition-all duration-200 outline-none
              focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
              ${
                isSelected
                  ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)] border border-blue-500"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-100 border border-slate-700"
              }
            `}
          >
            <Icon
              className={`w-5 h-5 ${isSelected ? "text-white" : "text-slate-400"}`}
              aria-hidden="true"
            />
            <span className="font-medium tracking-wide">{persona.label}</span>
            {isSelected && (
              <CheckCircle2
                className="absolute top-2 right-2 w-4 h-4 text-blue-200 animate-in fade-in zoom-in"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
