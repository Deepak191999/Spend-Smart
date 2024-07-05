import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const MyNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.navLink} to="/profile">Home</NavLink>
      <NavLink className={styles.navLink} to="/alltransaction">All Transaction</NavLink>
      <NavLink className={styles.navLink} to="/transactionBar">Transaction Bar</NavLink>
      <NavLink className={styles.navLink} to="/incomestats">Income Stats</NavLink>
      <NavLink className={styles.navLink} to="/expensestats">Expenses Stats</NavLink>
      <NavLink className={styles.navLink} to="/logout">Logout</NavLink>
    </nav>
  );
};

export default MyNavbar;
