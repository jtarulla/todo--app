import { render, screen, fireEvent, userEvent } from '@/test-utils'
import LoginForm from '@/application/components/LoginForm'

const handleSubmit = jest.fn()

describe('LoginForm component', () => {
  test('renders username field', async () => {
    render(<LoginForm onSubmit={handleSubmit} />)

    const usernameField = await screen.findByPlaceholderText('Username')

    expect(usernameField).toBeInTheDocument()
  })

  test('renders password field', async () => {
    render(<LoginForm onSubmit={handleSubmit} />)

    const passwordField = await screen.findByPlaceholderText('Password')

    expect(passwordField).toBeInTheDocument()
  })

  test('allows the user to submit credentials', async () => {
    render(<LoginForm onSubmit={handleSubmit} />)

    const usernameField = await screen.findByPlaceholderText('Username')
    const passwordField = await screen.findByPlaceholderText('Password')
    const submitButton = await screen.findByRole('button')

    await userEvent.type(usernameField, 'testuser')
    await userEvent.type(passwordField, 'testpassword')
    fireEvent.click(submitButton)

    expect(handleSubmit).toHaveBeenCalledWith('testuser', 'testpassword')
  })
})
