import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgress, Box, Typography } from '@mui/material';
import MyNavbar from '../MyNavbar/MyNavbar';
import styles from './TransactionBar.module.css';

const TransactionBar = () => {
  const [totalCredit, setTotalCredit] = useState(0); // Income
  const [totalDebit, setTotalDebit] = useState(0);   // Expense
  const [turnOver, setTurnOver] = useState(0);
  const [savingsRate, setSavingsRate] = useState(0);
  const [savingsRateIsGood, setSavingsRateIsGood] = useState(false);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get('http://localhost:4444/transactionBar', { withCredentials: true });
        const {
          totalCredit,
          totalDebit,
          turnOver,
          savingsRate,
          savingsRateIsGood,
        } = response.data;

        setTotalCredit(totalCredit);
        setTotalDebit(totalDebit);
        setTurnOver(turnOver);
        setSavingsRate(savingsRate);
        setSavingsRateIsGood(savingsRateIsGood);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransactionData();
  }, []);

  const creditPercentage = turnOver > 0 ? (totalCredit / turnOver) * 100 : 0;
  const debitPercentage = turnOver > 0 ? (totalDebit / turnOver) * 100 : 0;
  return (
    <>
      <MyNavbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Total Turn Over: {turnOver}</h2>
        <div className="row justify-content-center mb-4">
          <div className="col-auto">
            <h2 className={styles.Income}>Income: {totalCredit}</h2>
          </div>
          <div className="col-auto">
            <h2 className={styles.Expense}>Expense: {totalDebit}</h2>
          </div>
        </div>

        <div className="row justify-content-center d-flex">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', position: 'relative' }}>
            
            <CircularProgress
              variant="determinate"
              value={100} // Full circle
              size={150} // Size of the circle
              thickness={5}
              style={{ color: 'lightgrey' }}
            />
            {/* Green progress for credit */}
            <CircularProgress
              variant="determinate"
              value={creditPercentage}
              size={150} // Match the size of the background
              thickness={5}
              style={{ color: 'green', position: 'absolute' }} // Positioning on top
            />
            
            <Typography variant="h6">{Math.round(creditPercentage)}%</Typography>
          
            <h2>Income</h2>

          </Box> 

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', position: 'relative' }}>
            
            <CircularProgress
              variant="determinate"
              value={100} // Full circle
              size={150} // Size of the circle
              thickness={5}
              style={{ color: 'lightgrey' }}
            />
            
            <CircularProgress
              variant="determinate"
              value={debitPercentage}
              size={150} // Match the size of the background
              thickness={5}
              style={{ color: 'red', position: 'absolute' }} // Positioning on top
            />
            <Typography variant="h6">{Math.round(debitPercentage)}%</Typography>
            <h2>Income</h2>

          </Box>
        </div>

        <h2 className="text-center">General Advice</h2>
        {savingsRateIsGood ? (
          <h2 className="text-center">
            With {savingsRate}% of income saved, you are in an excellent financial position. You are saving well above the recommended minimum of 20% and even surpassing the 30% mark, which is excellent.
          </h2>
        ) : (
          <h2 className="text-center">
            You need to save more money. Try to increase your savings rate to at least 20% of your income.
          </h2>
        )}
      </div>
    </>
  );
};

export default TransactionBar;
