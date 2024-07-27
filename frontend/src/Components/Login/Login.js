


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Hook to navigate to other routes

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4444/login', {
//         username,
//         password,
//       }, { withCredentials: true }); // Allow credentials for CORS

//       if (response.status === 200) {
//         // Handle successful login, redirect to the profile page
//         console.log('Login successful:', response.data);
//         navigate('/profile'); // Redirect to the /profile route
//       }
//     } catch (err) {
//       setError('Invalid username or password');
//       console.error('Login error:', err.response.data);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate to other routes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4444/login', {
        username,
        password,
      }, { withCredentials: true }); // Allow credentials for CORS

      if (response.status === 200) {
        // Handle successful login, redirect to the profile page
        console.log('Login successful:', response.data);
        navigate('/profile'); // Redirect to the /profile route
      }
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err.response.data);
    }
  };
  const handleSignUp = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  return (
    <div className="login-container"> {/* Apply class for styling */}
      <h2 className="login-header">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="submit-button">Login</button>
      </form>
      <button className="signup-button" onClick={handleSignUp}>Sign Up</button> {/* Sign Up Button */}
    </div>
  );
};

export default Login;
