import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth from './CustomHooks/useAuth/useAuth';


const PublicRoute = ({ element: Element, restricted,  }) => {
    const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    // Optional: Add a loading spinner or placeholder
    return <div>Loading...</div>;
  }

  return (
    <>
    {isAuthenticated && restricted ? <Navigate to="/profile" /> : <Element />}
  </>
  );
};

export default PublicRoute;
