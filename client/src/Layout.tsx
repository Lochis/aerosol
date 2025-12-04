import ErrorBoundary from "./components/ErrorBoundary.tsx";
import Navbar from "./components/Navbar.jsx";
import { Toast, ToastContext } from "./components/Toast.tsx";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import type { ReactNode } from "react";
import { themeChange } from "theme-change";

export default function Layout() {
  const [toast, setToast] = useState<ReactNode>();

  // initialize theme-change on mount
  useEffect(() => {
    themeChange(false);

    // set default theme if none is saved
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      const defaultTheme = "coffee";
      document.documentElement.setAttribute("data-theme", defaultTheme);
      localStorage.setItem("theme", defaultTheme);
    }
  }, []);

  return (
    <div className="lg:max-w-7xl mx-auto">
      <ErrorBoundary>
        <ToastContext value={new Toast(setToast)}>
          <Navbar />
          {toast}
          <main>
            <Outlet />
          </main>
        </ToastContext>
      </ErrorBoundary>
    </div>
  );
}
