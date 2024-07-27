import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './IncomeStats.css'; // Ensure you create this CSS file
import MyNavbar from '../MyNavbar/MyNavbar';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const IncomeStats = () => {
  const [incomePercentage, setIncomePercentage] = useState({});

  useEffect(() => {
    const fetchIncomeStats = async () => {
      try {
        const response = await axios.get('http://localhost:4444/incomeStats', { withCredentials: true });
        setIncomePercentage(response.data.incomePercentage);
      } catch (error) {
        console.error("Error fetching income statistics:", error);
      }
    };

    fetchIncomeStats();
  }, []);

  const colors = {
    Salary: '#ff6384',
    Allowance: '#36a2eb',
    Cash: '#ffcd56',
    Bonus: '#4bc0c0',
    Other: '#9966ff',
  };

  const labels = Object.keys(incomePercentage);
  const data = labels.map(category => incomePercentage[category] || 0);
  const backgroundColor = labels.map(category => colors[category] || colors['Other']);

  const chartData = {
    labels,
    datasets: [{
      data,
      backgroundColor,
    }],
  };

  return (
    <>
      <MyNavbar />
      <div className="container">
        <h1 className="title">Income Statistics</h1>
        <div className="circular-progress">
          <Pie data={chartData} options={{
            plugins: {
              title: {
                display: true,
                text: 'Income Breakdown',
              },
              responsive: true,
            },
          }} />
        </div>
        <div className="labels">
          {labels.map((category, index) => (
            <span key={index} className={`label ${category}`}>
              {category}: {data[index]}%
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default IncomeStats;
