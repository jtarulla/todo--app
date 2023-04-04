import { useNavigate } from 'react-router'

import { useAuth } from '@/hooks/useAuth'
import LoginForm from '@/application/components/LoginForm'

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (username: string, password: string) => {
    try {
      const user = await login(username, password)
      if (user) {
        navigate('/')
      }
    } catch (e) {
      alert('Password does not match the username')
    }
  }

  return <LoginForm onSubmit={handleSubmit} />
}

export default LoginPage
