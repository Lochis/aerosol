import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import AuthLayout from "./AuthLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "/profile", element: <Profile /> },
            //{
            //  element: <ProtectedRoute />,
            // children: [
            //   { path: "/dashboard", element: <Dashboard /> },
            //   { path: "/profile", element: <Profile /> },
        ],
    },
    {
    path: "/",
    element: <AuthLayout />, // no Navbar
    children: [
      { path: "auth", element: <Auth /> },
    ],
  },
    //],
    //},
]);

export default router;
