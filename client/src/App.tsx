import { RouterProvider } from 'react-router'
import router from './Router.tsx'
import './App.css'
import { Auth, AuthContext, useStateToken } from './lib/auth.ts'

function App() {
  const [token, setToken] = useStateToken()
  return (
    <AuthContext value={new Auth(token, setToken)}>
      <RouterProvider router={router} />
    </AuthContext>
  )
}

export default App
