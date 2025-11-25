import ErrorBoundary from "./components/ErrorBoundary.tsx"
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="lg:max-w-7xl mx-auto">
      <Navbar />
      <ErrorBoundary>
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
}
