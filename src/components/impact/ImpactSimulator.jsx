import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

export default function ImpactSimulator({ setScreen }) {
  const [totalVoters, setTotalVoters] = useState(1000000);
  const [turnout, setTurnout] = useState(65);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const actualVotes = Math.round((totalVoters * turnout) / 100);
  const missedVotes = totalVoters - actualVotes;

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Voted', 'Did Not Vote'],
        datasets: [{
          data: [actualVotes, missedVotes],
          backgroundColor: ['#10b981', 'rgba(255,255,255,0.08)'],
          borderWidth: 0,
          borderRadius: 4,
          spacing: 2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '72%',
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: 'rgba(255,255,255,0.6)',
              font: { family: 'Inter', size: 13, weight: '500' },
              padding: 20,
              usePointStyle: true,
              pointStyleWidth: 10,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(10, 10, 26, 0.9)',
            titleFont: { family: 'Inter', weight: '600' },
            bodyFont: { family: 'Inter' },
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            callbacks: {
              label: (context) => `${context.label}: ${context.parsed.toLocaleString()} votes`,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [actualVotes, missedVotes]);

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="text-gradient">Impact Simulator</span>
        </h2>
        <p className="section-subtitle">
          See how voter turnout changes election outcomes
        </p>
      </div>

      <div className="impact-wrapper">
        {/* Controls */}
        <div className="impact-controls glass-card">
          <div className="impact-slider-group">
            <div className="impact-slider-label">
              <span>Eligible Voters</span>
              <span>{totalVoters.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="100000"
              value={totalVoters}
              onChange={(e) => setTotalVoters(parseInt(e.target.value))}
              className="impact-slider"
              id="impact-voters-slider"
            />
          </div>

          <div className="impact-slider-group">
            <div className="impact-slider-label">
              <span>Voter Turnout</span>
              <span>{turnout}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={turnout}
              onChange={(e) => setTurnout(parseInt(e.target.value))}
              className="impact-slider"
              id="impact-turnout-slider"
            />
          </div>

          <div className="impact-stat-highlight">
            <div className="impact-stat-number">{actualVotes.toLocaleString()}</div>
            <div className="impact-stat-desc">Votes Actually Cast</div>
          </div>
        </div>

        {/* Chart */}
        <div className="impact-chart-container">
          <canvas ref={chartRef} />
        </div>

        {/* Insight */}
        <motion.div
          className="impact-insight glass-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            💡 <strong>Did you know?</strong>
            <br />
            If turnout drops by just 10%, the winning margin can flip entirely.
            In 2019, over <strong>300 million</strong> eligible voters chose not to vote.
            <br /><br />
            <span style={{ color: 'var(--color-saffron)', fontWeight: 600 }}>
              Your vote is powerful. Use it. 🗳️
            </span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
