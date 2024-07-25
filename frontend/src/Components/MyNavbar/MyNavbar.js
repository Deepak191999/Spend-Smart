import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import axios from 'axios';

const MyNavbar = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get('/logout', { withCredentials: true });
      if (response.status === 200) {
        navigate('/login'); // Redirect to login page after successful logout
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.navLink} to="/profile">Profile</NavLink>
      <NavLink className={styles.navLink} to="/alltransaction">All Transaction</NavLink>
      <NavLink className={styles.navLink} to="/transactionBar">Transaction Bar</NavLink>
      <NavLink className={styles.navLink} to="/incomestats">Income Stats</NavLink>
      <NavLink className={styles.navLink} to="/expensestats">Expenses Stats</NavLink>
            <button className={styles.navLink} onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default MyNavbar;
