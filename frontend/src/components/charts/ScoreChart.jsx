// ScoreChart.jsx

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import '@/styles/ScoreChart.css';

const ScoreChart = ({ score }) => {
  if (score === undefined || score === null) {
    return <div>Loading...</div>;
  }

  const data = [
    { name: 'Score', value: score * 100 },
    { name: 'Rest', value: 100 - score * 100 }
  ];

  const COLORS = ['#FF0000', '#FBFBFB'];

  return (
    <div className="score-chart">
      <h2 className="score-title">Score</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={80}
            startAngle={90}
            endAngle={450}
            dataKey="value"
            paddingAngle={5}
            fill="#FFFFFF"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                cornerRadius={10}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="score-label">
        <span className="score-value">{score * 100}%</span>
        <span className="score-text">de votre objectif</span>
      </div>
    </div>
  );
};

export default ScoreChart;