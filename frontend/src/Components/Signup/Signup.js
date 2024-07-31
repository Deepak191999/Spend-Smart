


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate to other routes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4444/signup', {
        username,
        password,
      });

      if (response.status === 201) {
        // Handle successful signup, redirect to the login page
        console.log('Signup successful:', response.data);
        navigate('/login'); // Redirect to the login route
      }
    } catch (err) {
      setError(err.response.data.message || 'Signup failed');
      console.error('Signup error:', err.response.data);
    }
  };

  return (
    <div className="signup-container">
      {/* <h2 className="signup-header">Signup</h2> */}
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Signup</button>
        <p>
          Already have an account? <span className="login-link"  onClick={() => navigate('/login')}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
