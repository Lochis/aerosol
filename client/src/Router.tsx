import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "/profile", element: <Profile /> },
            //{ path: "/signup", element: <SignUp /> },
            //{
            //  element: <ProtectedRoute />,
            // children: [
            //   { path: "/dashboard", element: <Dashboard /> },
            //   { path: "/profile", element: <Profile /> },
        ],
    },
    //],
    //},
]);

export default router;
