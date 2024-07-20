import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AverageSessionChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="sessionLength" stroke="#8884d8" />
    </LineChart>
  );
};

export default AverageSessionChart;