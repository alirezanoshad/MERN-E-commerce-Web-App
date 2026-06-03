import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// children - components that need premission
// role - required role for children
export const ProtectedRoute = ({children, role}) => {
  // User information
  const { user } = useSelector((state) => state.auth);

  // Condition
  if (!user || (role && user.role !== role)) {
    // Redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Displays children component
  return children;
};
