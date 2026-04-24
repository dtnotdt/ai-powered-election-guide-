'use client';

import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

interface ConstituencyResult {
  id: string;
  name: string;
  partyName: string;
  votes: number;
  voteShare: number;
  status: 'leading' | 'trailing' | 'tied';
}

interface ResultsData {
  totalVotes: number;
  votesProcessed: number;
  turnout: number;
  constituencies: ConstituencyResult[];
}

interface ResultsDashboardProps {
  data: ResultsData;
  onConstituencySelect?: (constituency: ConstituencyResult) => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  data,
  onConstituencySelect,
}) => {
  const completionPercentage = (data.votesProcessed / data.totalVotes) * 100;
  const sortedConstituencies = [...data.constituencies].sort((a, b) => b.votes - a.votes);

  return (
    <div className="h-full flex flex-col gap-4 overflow-y-auto">
      <div className="grid grid-cols-2 gap-3 flex-shrink-0">
        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
          <p className="text-xs text-slate-400 mb-1">Turnout</p>
          <p className="text-2xl font-bold text-emerald-400">{data.turnout}%</p>
        </div>
        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
          <p className="text-xs text-slate-400 mb-1">Completion</p>
          <p className="text-2xl font-bold text-emerald-400">{completionPercentage.toFixed(1)}%</p>
        </div>
      </div>

      <div className="flex-shrink-0">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
            Vote Processing
          </p>
          <span className="text-xs text-slate-400">
            {data.votesProcessed.toLocaleString()} / {data.totalVotes.toLocaleString()}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">
          Top Constituencies
        </h3>
        <div className="space-y-2 overflow-y-auto h-full">
          {sortedConstituencies.slice(0, 8).map((constituency) => {
            const maxVotes = Math.max(...sortedConstituencies.map((c) => c.votes));
            const barWidth = (constituency.votes / maxVotes) * 100;

            return (
              <button
                key={constituency.id}
                onClick={() => onConstituencySelect?.(constituency)}
                className="w-full text-left p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-semibold text-slate-100">{constituency.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-400">
                      {constituency.voteShare}%
                    </span>
                    {constituency.status === 'leading' && (
                      <TrendingUp size={14} className="text-emerald-400" />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">{constituency.partyName}</p>
                  <p className="text-xs text-slate-400">
                    {constituency.votes.toLocaleString()} votes
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-shrink-0 p-3 rounded-lg bg-slate-800/50 border border-slate-700 flex items-start gap-2">
        <BarChart3 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-300">
          Results are live and updating. Refresh for the latest data.
        </p>
      </div>
    </div>
  );
};
