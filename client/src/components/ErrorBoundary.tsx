import axios from "axios"
import { useEffect, useState } from "react"
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary"
import { useNavigate } from "react-router"
import type { ErrorInfo, ReactNode } from "react"
import { useAuth } from "../lib/auth"

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={onError}>
      {children}
    </ReactErrorBoundary>
  )
}

function FallbackComponent(
  { error, resetErrorBoundary }: { error: any, resetErrorBoundary: any },
) {
  const [hidden, setHidden] = useState(false)
  const navigate = useNavigate()
  const auth = useAuth()

  function login() {
    auth.clearAuth()
    navigate("/auth")
    resetErrorBoundary()
  }

  useEffect(() => {
    const id = setTimeout(() => setHidden(true), 10000)
    return () => clearTimeout(id)
  }, [])

  let toastComponents = <>
    <span>Something went wrong: {error.message}</span>
  </>

  if (axios.isAxiosError(error) && error.config?.baseURL == process.env.CLIENT_API_BASE) {
    const message = String(error.response?.data?.error?.message || error.response?.data?.error)
    if (error.status == 401 && message.startsWith("UnauthorizedError")) {
      toastComponents = <>
        <span>Your session has expired. Please log in again!</span>
        <button onClick={login} className="btn btn-sm btn-primary">Login</button>
      </>
    } else if (message) {
      toastComponents = <>
        <span>{message}</span>
      </>
    }
  }

  return (
    <div className="toast toast-top toast-center" hidden={hidden}>
      <div className="alert alert-error">
        {toastComponents}
      </div>
    </div>
  )
}

function onError(error: Error, info: ErrorInfo) {
  console.error(`Error caught by ErrorBoundary: ${error}\nStack: ${info.componentStack}`)
}
