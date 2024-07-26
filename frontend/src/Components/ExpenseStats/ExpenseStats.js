import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './ExpenseStats.css'; // Ensure you create this CSS file
import MyNavbar from '../MyNavbar/MyNavbar';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const ExpenseStats = () => {
  const [expensePercentage, setExpensePercentage] = useState({});

  useEffect(() => {
    const fetchExpenseStats = async () => {
      try {
        const response = await axios.get('http://localhost:4444/expenseStats', { withCredentials: true });
        setExpensePercentage(response.data.expensePercentage);
      } catch (error) {
        console.error("Error fetching expense statistics:", error);
      }
    };

    fetchExpenseStats();
  }, []);

  const colors = {
    Food: '#ff6384',
    Clothes: '#36a2eb',
    Household: '#ffcd56',
    Health: '#4bc0c0',
    Pets: '#9966ff',
    Transport: '#d80f3a',
    Culture: '#36a2eb',
    Apparel: '#ffcd56',
    Beauty: '#4bc0c0',
    Education: '#9966ff',
    Gift: '#ff9f40',
    Other: '#b3b3b3',
  };

  const labels = Object.keys(expensePercentage);
  const data = labels.map(category => expensePercentage[category] || 0);
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
        <h1 className="title">Expense Statistics</h1>
        <div className="circular-progress">
          <Pie data={chartData} options={{
            plugins: {
              title: {
                display: true,
                text: 'Expense Breakdown',
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

export default ExpenseStats;



// // ExpenseStats.js
// import React from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import './ExpenseStats.css'; // Ensure you create this CSS file
// import MyNavbar from '../MyNavbar/MyNavbar';

// // Register Chart.js components
// ChartJS.register(Title, Tooltip, Legend, ArcElement);

// const ExpenseStats = ({ expensePercentage }) => {
//   // Sample data, replace this with real data from your API or state
//   const sampleData = {
//     Food: 25,
//     Clothes: 10,
//     Household: 15,
//     Health: 10,
//     Pets: 5,
//     Transport: 20,
//     Culture: 5,
//     Apparel: 5,
//     Beauty: 3,
//     Education: 2,
//     Gift: 8,
//     Other: 7,
//   };

//   const colors = {
//     Food: '#ff6384',
//     Clothes: '#36a2eb',
//     Household: '#ffcd56',
//     Health: '#4bc0c0',
//     Pets: '#9966ff',
//     Transport: '#d80f3a',
//     Culture: '#36a2eb',
//     Apparel: '#ffcd56',
//     Beauty: '#4bc0c0',
//     Education: '#9966ff',
//     Gift: '#ff9f40',
//     Other: '#b3b3b3',
//   };

//   const labels = Object.keys(sampleData);
//   const data = labels.map(category => sampleData[category]);
//   const backgroundColor = labels.map(category => colors[category] || colors['Other']);

//   const chartData = {
//     labels,
//     datasets: [{
//       data,
//       backgroundColor,
//     }],
//   };

//   return (
//     <>   <MyNavbar />
//     <div className="container">
//       <h1 className="title">Expense Statistics</h1>
//       <div className="circular-progress">
//         <Pie data={chartData} options={{
//           plugins: {
//             title: {
//               display: true,
//               text: 'Expense Breakdown',
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
//     </div></>
//   );
// };

// export default ExpenseStats;