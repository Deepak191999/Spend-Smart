// IncomeStats.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './IncomeStats.css'; // Ensure you create this CSS file

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const IncomeStats = ({ incomePercentage }) => {
  // Sample data, replace this with real data from your API or state
  const sampleData = {
    Salary: 50,
    Allowance: 20,
    Cash: 10,
    Bonus: 15,
    Other: 5,
  };

  const colors = {
    Salary: '#ff6384',
    Allowance: '#36a2eb',
    Cash: '#ffcd56',
    Bonus: '#4bc0c0',
    Other: '#9966ff',
  };

  const labels = Object.keys(sampleData);
  const data = labels.map(category => sampleData[category]);
  const backgroundColor = labels.map(category => colors[category] || colors['Other']);

  const chartData = {
    labels,
    datasets: [{
      data,
      backgroundColor,
    }],
  };

  return (
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
  );
};

export default IncomeStats;






 // IncomeStatistics.js
// import React, { useEffect } from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import './IncomeStatistics.css'; // Ensure you create this CSS file

// // Register Chart.js components
// ChartJS.register(Title, Tooltip, Legend, ArcElement);

// const IncomeStatistics = ({ incomePercentage }) => {
//   useEffect(() => {
//     // No need to do anything here as we are using react-chartjs-2
//   }, []);

//   const colors = {
//     Salary: '#ff6384',
//     Allowance: '#36a2eb',
//     Cash: '#ffcd56',
//     Bonus: '#4bc0c0',
//     Other: '#9966ff',
//   };

//   const labels = Object.keys(incomePercentage);
//   const data = labels.map(category => incomePercentage[category]);
//   const backgroundColor = labels.map(category => colors[category] || colors['Other']);

//   const chartData = {
//     labels,
//     datasets: [{
//       data,
//       backgroundColor,
//     }],
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Income Statistics</h1>
//       <div className="circular-progress">
//         <Pie data={chartData} options={{
//           plugins: {
//             title: {
//               display: true,
//               text: 'Income Breakdown',
//             },
//             responsive: true,
//           },
//         }} />
//       </div>
//       <div className="labels">
//         {labels.map((category, index) => (
//           <span key={index} className={`label ${category}`}>
//             {category}: {data[index]}%
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default IncomeStatistics;
