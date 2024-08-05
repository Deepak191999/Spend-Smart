
// hooks/useAuth.js
import { useEffect, useState } from 'react';
import axios from '../../../utils/axios'

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if the user is authenticated
        const response = await axios.get('/checkAuth', { withCredentials: true });
        setIsAuthenticated(response.data.authenticated); // Set authentication state
      } catch (error) {
        setIsAuthenticated(false); // Set to false on error
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated; // Return the authentication state
};

export default useAuth;

