import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const ScoreChart = ({ score }) => {
  if (score === undefined || score === null) {
    return <div>Loading...</div>;
  }

  const data = [
    { name: 'Score', value: score * 100 },
    { name: 'Rest', value: 100 - score * 100 }
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default ScoreChart;