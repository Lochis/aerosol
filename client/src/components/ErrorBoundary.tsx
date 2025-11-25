import axios from "axios"
import { useEffect, useState } from "react"
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary"
import { useNavigate } from "react-router"
import type { ErrorInfo, ReactNode } from "react"
import { useAuth } from "../lib/auth"

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={(props) => FallbackComponent(children, props)}
      onError={onError}>
      {children}
    </ReactErrorBoundary>
  )
}

function FallbackComponent(
  children: ReactNode,
  { error, resetErrorBoundary }: { error: any, resetErrorBoundary: any },
) {
  const [hidden, setHidden] = useState(false)
  const navigate = useNavigate()
  const auth = useAuth()

  function login() {
    auth.clearToken()
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
    const message = error.response?.data?.error?.message
    if (message) {
      toastComponents = <>
        <span>{message}</span>
      </>
    } else if (error.status == 401) {
      toastComponents = <>
        <span>Your session has expired. Please log in again!</span>
        <button onClick={login} className="btn btn-primary">Login</button>
      </>
    }
  }

  return (
    <>
      <div className="toast toast-top toast-center" hidden={hidden}>
        <div className="alert alert-danger">
          {toastComponents}
        </div>
      </div>
      {children}
    </>
  )
}

function onError(error: Error, info: ErrorInfo) {
  console.error(`Error caught by ErrorBoundary: ${error}\nStack: ${info.componentStack}`)
}
