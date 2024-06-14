import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DailyActivityChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#ffffff', padding: '10px', border: '1px solid #cccccc' }}>
          <p className="label">{`${payload[0].value}kg`}</p>
          <p className="label">{`${payload[1].value}Kcal`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="daily-activity-chart">
      <h2 style={{ color: '#20253A' }}>Activité quotidienne</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tickLine={false} tick={{ fontSize: 14, fill: '#74798C' }} />
          <YAxis yAxisId="right" dataKey="kilogram" orientation="right" stroke="#282D30" axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: '#74798C' }} />
          <YAxis yAxisId="left" dataKey="calories" hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }} />
          <Legend verticalAlign="top" align="right" iconType="circle" />
          <Bar yAxisId="right" dataKey="kilogram" fill="#282D30" barSize={7} radius={[3, 3, 0, 0]} name="Poids (kg)" />
          <Bar yAxisId="left" dataKey="calories" fill="#E60000" barSize={7} radius={[3, 3, 0, 0]} name="Calories brûlées (kCal)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyActivityChart;
