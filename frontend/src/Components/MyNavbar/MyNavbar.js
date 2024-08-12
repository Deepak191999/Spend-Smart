import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import axios from "../../utils/axios"

const MyNavbar = () => {

  const navigate = useNavigate();
  function clearCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';}

  const handleLogout = async () => {
    try {
        const response = await axios.get('/logout', {}, { withCredentials: true });
        console.log(response.data.message); // Handle successful logout
        if (response.status === 200) {
          
                alert('Logged out successfully'); 
                clearCookie("accessToken")
                clearCookie("refreshToken")
                navigate('/');
        }
    } catch (error) {
        console.error('Error during logout:', error);
        // Handle error state
    }
};

  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.navLink} to="/profile">Profile</NavLink>
      <NavLink className={styles.navLink} to="/alltransaction">All Transaction</NavLink>
      <NavLink className={styles.navLink} to="/transactionBar">Transaction Bar</NavLink>
      <NavLink className={styles.navLink} to="/incomestats">Income Stats</NavLink>
      <NavLink className={styles.navLink} to="/expensestats">Expenses Stats</NavLink>
      <NavLink  className={styles.navLink} to="/chatbot">BudgetBuddy</NavLink>
        <button className={styles.navLink} onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default MyNavbar;
