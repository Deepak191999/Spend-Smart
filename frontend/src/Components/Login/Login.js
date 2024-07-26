// import React, { useState } from 'react';
// import axios from 'axios';
// import './Login.css';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('/login', { username, password }, { withCredentials: true });
//       if (response.status === 200) {
//         window.location.href = '/profile';
//       }
//     } catch (error) {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Welcome to login page</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Enter username"
//           value={username}
//           onChange={handleUsernameChange}
//         />
//         <br />
//         <input
//           type="password"
//           name="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={handlePasswordChange}
//         />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//       {error && <p className="error-message">{error}</p>}
//       <div className="signup-link">
//         <h3>New User?? Signup</h3>
//         <Link to="/signup" className="btn">Signup</Link>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
