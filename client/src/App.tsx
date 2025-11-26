import { RouterProvider } from 'react-router'
import router from './Router.tsx'
import './App.css'
import { Auth, AuthContext, useAuthData } from './lib/auth.ts'

function App() {
  const [authData, setAuthData] = useAuthData()
  return (
    <AuthContext value={new Auth(authData, setAuthData)}>
      <RouterProvider router={router} />
    </AuthContext>
  )
}

export default App
