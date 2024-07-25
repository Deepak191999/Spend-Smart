import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/signup', { username, password });
      window.location.href = '/login';
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h1>Welcome to signup page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
        <input
          type="text"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <button type="submit">Signup</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="login-link">
        <h3>Existing User? Login</h3>
        <Link to="/login" className="btn">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
