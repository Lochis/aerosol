import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="lg:max-w-7xl mx-auto">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
