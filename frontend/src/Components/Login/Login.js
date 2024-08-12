import React, { useState } from 'react';
import axios from "../../utils/axios"
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate to other routes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', {
        email,
        password,
      }, { withCredentials: true }); // Allow credentials for CORS

      if (response.status === 200) {
        // Handle successful login, redirect to the profile page
        console.log('Login successful:', response.data);
        navigate('/profile'); // Redirect to the /profile route
      }
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err.response.data);
    }
  };
  const handleSignUp = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  return (
    <div className="login-container"> 
      {/* <h2 className="login-header">Login</h2> */}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="text"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="submit-button">Login</button>
        <p>
          Hey New User? <span className="signup-button" onClick={handleSignUp}>Sign Up</span> 
        </p>
      </form>
      
      
    </div>
  );
};

export default Login;
