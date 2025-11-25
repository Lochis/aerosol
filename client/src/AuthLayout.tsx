import { Outlet } from "react-router"
import ErrorBoundary from "./components/ErrorBoundary.tsx"
import { ToastContainer } from "./lib/toasts.tsx"

export default function AuthLayout() {
  return (
    <ErrorBoundary>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center">
        <Outlet />
      </div>
    </ErrorBoundary>
  )
}
