import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import '@/styles/IntensityChart.css';

const IntensityChart = ({ data, kind }) => {
  if (!data || data.length === 0 || !kind) {
    return <div>Loading...</div>;
  }

  const formattedData = data.map(item => ({
    value: item.value,
    kind: kind[item.kind]
  }));

  return (
    <div className="intensity-chart">
      <ResponsiveContainer width={258} height={263}>
        <RadarChart outerRadius={80} data={formattedData}>
          <PolarGrid gridType="polygon" radialLines={false} />
          <PolarAngleAxis dataKey="kind" tick={{ fill: '#fff', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 250]} tickCount={6} tick={false} />
          <Radar name="Intensity" dataKey="value" stroke="#ff0101" fill="#ff0101" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IntensityChart;