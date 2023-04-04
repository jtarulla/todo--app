import { useNavigate } from 'react-router'

import { useAuth } from '@/hooks/useAuth'

const LogoutButton = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleClick = () => {
    logout()
    navigate('/login')
  }

  return (
    <button className="logout-button" onClick={handleClick}>
      Logout
    </button>
  )
}

export default LogoutButton
