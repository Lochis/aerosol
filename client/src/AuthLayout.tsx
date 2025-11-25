import { useState } from "react"
import { Outlet } from "react-router"
import type { ReactNode } from "react"
import ErrorBoundary from "./components/ErrorBoundary.tsx"
import { Toast, ToastContext } from "./components/Toast.tsx"

export default function AuthLayout() {
  const [toast, setToast] = useState<ReactNode>()
  return (
    <ErrorBoundary>
      <ToastContext value={new Toast(setToast)}>
        {toast}
        <div className="min-h-screen flex items-center justify-center">
          <Outlet />
        </div>
      </ToastContext>
    </ErrorBoundary>
  )
}
