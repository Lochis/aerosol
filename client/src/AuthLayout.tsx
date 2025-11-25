import { Outlet } from "react-router"
import ErrorBoundary from "./components/ErrorBoundary.tsx"

export default function AuthLayout() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex items-center justify-center">
        <Outlet />
      </div>
    </ErrorBoundary>
  )
}
