import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Correct the import path
import { Navigate, useLocation } from "react-router-dom"; // Corrected import for `useLocation` and `Navigate`

const AdminRoute = ({ children }) => {
  const { user, getUser, isLoading } = useContext(AuthContext); // Destructure the necessary context values
  const location = useLocation(); // Get the current location for redirection
  const userInfo = getUser(); // Get the user information

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while checking if the user is authenticated
  }

  // Check if the user is authenticated and has an 'admin' role
  if (user && userInfo.role === "admin") {
    return children; // Render children if the user is an admin
  }

  // If the user is not an admin, redirect to the homepage or another page
  return (
    <Navigate
      to="/"
      state={{ from: location }} // Store the current location to redirect back after login
      replace
    />
  );
};

export default AdminRoute;
