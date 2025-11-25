import axios from "axios"
import { useNavigate } from "react-router"
import { useAuth } from "../lib/auth"
import { createContext, useContext, useEffect } from "react"
import type { ReactNode } from "react"

export function ExpiredSessionToast() {
  const navigate = useNavigate()
  const auth = useAuth()

  function login() {
    auth.clearAuth()
    navigate("/auth")
  }

  return (
    <ErrorToast>
      <span>Your session has expired. Please log in again!</span>
      <button onClick={login} className="btn btn-sm btn-primary">Login</button>
    </ErrorToast>
  )
}

export function ErrorToast({ children }: { children: ReactNode }) {
  const toast = useToast()

  useEffect(() => {
    const id = setTimeout(() => toast.clear(), 3000)
    return () => clearTimeout(id)
  }, [toast])

  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-error">
        {children}
      </div>
    </div>
  )
}

export class Toast {
  setNode: (node: ReactNode) => void;

  constructor(setNode: (node: ReactNode) => void) {
    this.setNode = setNode;
  }

  error(error: any) {
    let toast = (
      <ErrorToast>
        <span>Something went wrong: {error.message || error}</span>
      </ErrorToast>
    )

    if (axios.isAxiosError(error) && error.config?.baseURL == process.env.CLIENT_API_BASE) {
      const message = String(error.response?.data?.error?.message || error.response?.data?.error)

      if (error.status == 401 && message.startsWith("UnauthorizedError")) {
        toast = <ExpiredSessionToast />
      } else if (message) {
        toast = <ErrorToast><span>{message}</span></ErrorToast>
      }
    }

    this.setNode(toast)
  }

  clear() {
    this.setNode(null)
  }
}

export const ToastContext = createContext<Toast | null>(null);
export const useToast = () => useContext(ToastContext)!
