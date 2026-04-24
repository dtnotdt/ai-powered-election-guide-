"use client";

import { useState } from "react";
import PersonaSelector from "../../components/election/PersonaSelector";
import ElectionJourneyMap from "../../components/election/ElectionJourneyMap";
import ContextualAssistant from "../../components/election/ContextualAssistant";

export default function TestPage() {
  const [activePersona, setActivePersona] = useState("first-time");
  const [activeStage, setActiveStage] = useState("registration");

  return (
    <main className="max-w-6xl mx-auto px-4 py-12" aria-label="Election UI Sandbox">
      <header className="mb-12 border-b border-slate-800 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight mb-3">
          Election Sandbox Environment
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Isolated testing for the new GovTech-inspired UI architecture. Ensure perfect keyboard accessibility and responsive layouts before merging.
        </p>
      </header>

      <div className="space-y-12">
        {/* Persona Section */}
        <section aria-labelledby="persona-heading">
          <h2 id="persona-heading" className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
            1. Select Persona
          </h2>
          <PersonaSelector onSelect={setActivePersona} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Journey Map Section */}
          <section aria-labelledby="journey-heading" className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h2 id="journey-heading" className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">
              2. Election Journey
            </h2>
            <ElectionJourneyMap activeStageId={activeStage} onNodeSelect={setActiveStage} />
          </section>

          {/* Contextual Assistant Section */}
          <section aria-labelledby="assistant-section-heading" className="flex flex-col">
            <h2 id="assistant-section-heading" className="sr-only">
              Contextual Assistant
            </h2>
            <ContextualAssistant activeStageId={activeStage} />
          </section>
        </div>
      </div>
    </main>
  );
}
