import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("isLoggedIn")); // Adjust this condition based on your auth logic

  if (!isAuthenticated) {
    // User is not authenticated, redirect to login
    return <Navigate to="/" replace />;
  }

  return children;
};
