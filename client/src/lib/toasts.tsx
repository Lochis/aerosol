import axios from "axios"
import { useNavigate } from "react-router"
import { ToastContainer as _ToastContainer, toast as _toast, cssTransition } from "react-toastify"
import { useAuth } from "./auth"
import type { ReactNode } from "react";

const Disabled = cssTransition({
  enter: "noop",
  exit: "noop",
  collapse: false
});

export function ToastContainer() {
  // https://fkhadra.github.io/react-toastify/api/toast-container
  return <_ToastContainer
    position="top-center"
    // className="toast toast-top toast-center"
    closeButton={false}
    hideProgressBar={true}
    limit={1}
    pauseOnFocusLoss={false}
    pauseOnHover={false}
    theme=""
    // toastClassName="alert alert-error"
    transition={Disabled}
  />
}

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
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-error">
        {children}
      </div>
    </div>
  )
}

export function error(error: any) {
  let children = <ErrorToast><span>Something went wrong: {error.message || error}</span></ErrorToast>
  if (axios.isAxiosError(error) && error.config?.baseURL == process.env.CLIENT_API_BASE) {
    const message = String(error.response?.data?.error?.message || error.response?.data?.error)
    if (error.status == 401 && message.startsWith("UnauthorizedError")) {
      children = <ExpiredSessionToast />
    } else if (message) {
      children = <ErrorToast><span>{message}</span></ErrorToast>
    }
  }
  _toast(children) // 😬
}

export default {
  ErrorToast,
  ExpiredSessionToast,
  ToastContainer,
  error,
}
