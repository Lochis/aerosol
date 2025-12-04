import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import AuthLayout from "./AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: "profile", element: <Profile /> },
          { path: "profile/:tag", element: <Profile /> },
          { path: "settings", element: <Settings /> },
        ]
      }
    ],
  },
  {
    path: "/",
    element: <AuthLayout />, // no Navbar
    children: [
      { path: "auth", element: <Auth /> },
    ],
  },
]);

export default router;
