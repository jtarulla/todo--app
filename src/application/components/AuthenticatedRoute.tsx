import { Navigate, Outlet } from 'react-router-dom'
import { getLoggedInUser } from '@/infraestructure/localStorage'

const AuthenticatedRoute = () => {
  const loggedInUser = getLoggedInUser()

  return loggedInUser ? <Outlet /> : <Navigate to="/login" />
}

export default AuthenticatedRoute
