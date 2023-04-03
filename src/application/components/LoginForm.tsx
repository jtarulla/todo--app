import { useState } from 'react'

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [values, setValues] = useState({ username: '', password: '' })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target

    setValues({
      ...values,
      [id]: value,
    })
  }

  const handleSubmit = (event: React.FormEvent) => {
    const { username, password } = values
    event.preventDefault()
    onSubmit(username, password)
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        className="input-field"
        type="text"
        id="username"
        name="username"
        value={values.username}
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        className="input-field"
        type="password"
        id="password"
        name="password"
        value={values.password}
        placeholder="Password"
        onChange={handleChange}
      />
      <button className="submit-button" type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm
