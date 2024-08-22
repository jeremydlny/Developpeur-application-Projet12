import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import '@/styles/AverageSessionChart.css';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

const AverageSessionChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const transformedData = data.map((item, index) => ({
    ...item,
    day: daysOfWeek[index % 7],
  }));

  return (
    <div className="average-session">
      <h2 className="chart-title">Durée moyenne des sessions</h2>
      <div style={{ width: '100%', height: 'calc(100% - 40px)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={transformedData}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="white" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="white" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fill: '#fff' }} interval={0} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="sessionLength" 
              stroke="url(#colorLine)" 
              strokeWidth={2} 
              dot={{ r: 4, strokeWidth: 2 }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AverageSessionChart;