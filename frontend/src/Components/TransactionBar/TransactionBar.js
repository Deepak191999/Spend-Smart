import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './TransactionBar.module.css';

const TransactionBar = ({ totalCredit = 0, totalDebit = 0, turnOver = 0, savingsRate = 0, savingsRateIsGood = false }) => {
  useEffect(() => {
    const creditProgress = document.querySelector(`.${styles.creditProgress}`);
    const debitProgress = document.querySelector(`.${styles.debitProgress}`);

    const createCircularProgress = (progressBar, percentage, progressColor) => {
      const progressValue = progressBar.querySelector(`.${styles.percentage}`);
      const innerCircle = progressBar.querySelector(`.${styles.innerCircle}`);

      let startValue = 0;
      const endValue = Math.round(percentage);
      const speed = 10;

      const progress = setInterval(() => {
        if (startValue <= endValue) {
          progressValue.textContent = `${startValue}%`;
          progressValue.style.color = progressColor;
          innerCircle.style.backgroundColor = `lightgrey`;
          progressBar.style.background = `conic-gradient(${progressColor} ${startValue * 3.6}deg, ${progressBar.getAttribute("data-bg-color")} 0deg)`;
          startValue++;
        } else {
          clearInterval(progress);
        }
      }, speed);
    };

    if (totalCredit >= 1) {
      const debitPercentage = (totalDebit / totalCredit) * 100;
      const creditPercentage = 100 - debitPercentage;

      createCircularProgress(creditProgress, creditPercentage, "green");
      createCircularProgress(debitProgress, debitPercentage, "red");
    } else {
      createCircularProgress(creditProgress, 0, "green");
      createCircularProgress(debitProgress, 0, "red");
    }
  }, [totalCredit, totalDebit]);

  return (
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

      <div className={`row justify-content-center ${styles.ProgressBar}`}>
        <div className="col-auto">
          <div className={`${styles.circularProgress} ${styles.creditProgress}`} data-total-amount={totalCredit} data-progress-color="green" data-bg-color="lightgrey">
            <div className={styles.innerCircle}></div>
            <p className={styles.percentage}>0%</p>
          </div>
        </div>
        <div className="col-auto">
          <div className={`${styles.circularProgress} ${styles.debitProgress}`} data-total-amount={totalDebit} data-progress-color="red" data-bg-color="lightgrey">
            <div className={styles.innerCircle}></div>
            <p className={styles.percentage}>0%</p>
          </div>
        </div>
      </div>
      
      <h2 className="text-center">General Advice</h2>
      {savingsRateIsGood ? (
        <h2 className="text-center">With {savingsRate}% of income saved, You are in an excellent financial position. You are saving well above the recommended minimum of 20% and even surpassing the 30% mark, which is excellent.</h2>
      ) : (
        <h2 className="text-center">You need to save more money. Try to increase your savings rate to at least 20% of your income.</h2>
      )}
    </div>
  );
};

export default TransactionBar;
