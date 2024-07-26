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



// // IncomeStats.js
// import React from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import './IncomeStats.css'; // Ensure you create this CSS file
// import MyNavbar from '../MyNavbar/MyNavbar';

// // Register Chart.js components
// ChartJS.register(Title, Tooltip, Legend, ArcElement);

// const IncomeStats = ({ incomePercentage }) => {
//   // Sample data, replace this with real data from your API or state
//   const sampleData = {
//     Salary: 50,
//     Allowance: 20,
//     Cash: 10,
//     Bonus: 15,
//     Other: 5,
//   };

//   const colors = {
//     Salary: '#ff6384',
//     Allowance: '#36a2eb',
//     Cash: '#ffcd56',
//     Bonus: '#4bc0c0',
//     Other: '#9966ff',
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
//     <>   <MyNavbar/>
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
//     </>
//   );
// };

// export default IncomeStats;






//  // IncomeStatistics.js
// import React, { useEffect } from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import './IncomeStats.css'; // Ensure you create this CSS file

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




//------------------------------
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import { Container, Card } from 'react-bootstrap';

// // Register Chart.js components
// ChartJS.register(Title, Tooltip, Legend, ArcElement);

// const IncomeStats = () => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchIncomeStats = async () => {
//             try {
//                 const response = await axios.get('/api/incomeStats');
//                 setData(response.data);
//             } catch (err) {
//                 setError(err);
//             }
//         };

//         fetchIncomeStats();
//     }, []);

//     if (error) return <div>Error: {error.message}</div>;
//     if (!data) return <div>Loading...</div>;

//     const labels = Object.keys(data.incomePercentage);
//     const values = Object.values(data.incomePercentage);
//     const backgroundColor = labels.map((_, index) => {
//         // Generate a color for each category (you can customize these colors)
//         const colors = ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff'];
//         return colors[index % colors.length];
//     });

//     const chartData = {
//         labels,
//         datasets: [{
//             data: values,
//             backgroundColor,
//         }],
//     };

//     return (
//         <Container>
//             <Card>
//                 <Card.Body>
//                     <Card.Title>Income Statistics</Card.Title>
//                     <Card.Text>Total Income: ${data.totalIncome}</Card.Text>
//                     <Pie data={chartData} options={{
//                         plugins: {
//                             title: {
//                                 display: true,
//                                 text: 'Income Breakdown',
//                             },
//                             responsive: true,
//                         },
//                     }} />
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default IncomeStats;
