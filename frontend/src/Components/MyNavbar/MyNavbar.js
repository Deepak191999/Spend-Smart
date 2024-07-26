import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import axios from 'axios';

const MyNavbar = () => {

  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     const response = await axios.post('/logout', { withCredentials: true });
  //     if (response.status === 200) {
  //       // Optionally show a success message here
  //       alert('Logged out successfully'); // You can replace this with a more sophisticated notification system
  //       navigate('/login'); // Redirect to login page after successful logout
  //     }
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //     alert('Logout failed. Please try again.'); // Inform the user about the failure
  //   }
  // };

  const handleLogout = async () => {
    try {
        const response = await axios.post('http://localhost:4444/logout', {}, { withCredentials: true });
        console.log(response.data.message); // Handle successful logout
        if (response.status === 200) {
          
                alert('Logged out successfully'); // You can replace this with a more sophisticated notification system
                navigate('/login');
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
        <button className={styles.navLink} onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default MyNavbar;
