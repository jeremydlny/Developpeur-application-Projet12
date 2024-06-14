import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const IntensityChart = ({ data, kind }) => {
  if (!data || data.length === 0 || !kind) {
    return <div>Loading...</div>;
  }

  const formattedData = data.map(item => ({
    ...item,
    kind: kind[item.kind]
  }));

  return (
    <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={formattedData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="kind" />
      <PolarRadiusAxis />
      <Radar name="Mike" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
  );
};

export default IntensityChart;