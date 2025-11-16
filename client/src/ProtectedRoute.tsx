import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "./lib/auth";
import { useEffect } from "react";

export default function ProtectedRoute() {
    useEffect(() => {
        console.log("ProtectedRoute - Not Authenticated, redirecting to /auth");
    }, []);
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  return <Outlet />
}
