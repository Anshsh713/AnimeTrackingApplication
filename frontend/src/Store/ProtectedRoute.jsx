import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, token, user } = useAuth();

  if (token && !user) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>Loading...</h2>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
}
