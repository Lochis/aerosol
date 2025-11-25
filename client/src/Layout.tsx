import ErrorBoundary from "./components/ErrorBoundary.tsx"
import Navbar from "./components/Navbar.jsx";
import { Toast, ToastContext } from "./components/Toast.tsx";
import { useState } from "react";
import { Outlet } from "react-router";
import type { ReactNode } from "react";

export default function Layout() {
  const [toast, setToast] = useState<ReactNode>()
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
