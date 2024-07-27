// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../CustomHooks/useAuth/useAuth';



const ProtectedRoute = ({ element: Element }) => {
    const isAuthenticated = useAuth(); // Check authentication status
  
    if (isAuthenticated === null) {
        // Optional: Add a loading state or return null while checking auth
        return null; // or a loading spinner
      }

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    }
  
    return <Element />; // Render the protected component if authenticated
  };
  
  export default ProtectedRoute;
