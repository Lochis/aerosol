import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./lib/auth";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const auth = useAuth()

  useEffect(() => {
    if (auth.isAuthenticated()) return;
    console.log("ProtectedRoute - Not Authenticated, redirecting to /auth");
  }, [auth]);

  const location = useLocation();
  if (!auth.isAuthenticated()) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  return <Outlet />
}
