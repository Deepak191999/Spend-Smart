// components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../CustomHooks/useAuth/useAuth";

const ProtectedRoute = ({ element: Element }) => {
  const isAuthenticated = useAuth(); // Check authentication status

  if (isAuthenticated === null) {
    // Optional: Add a loading spinner or placeholder
    return <div>Loading...</div>;
  }

  return (
    <>{isAuthenticated ? <Element /> : <Navigate to="/login" replace />}</>
  );
};

export default ProtectedRoute;
