import { render, userEvent, screen, waitFor } from '@/test-utils'

import LoginPage from '@/application/pages/LoginPage'
import { useAuth } from '@/hooks/useAuth'

jest.mock('@/hooks/useAuth')
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>

describe('LoginPage', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      login: jest.fn().mockResolvedValue({
        id: '1',
        username: 'testuser',
        password: 'hashedPassword',
        tasks: [],
      }),
      logout: jest.fn(),
    })
  })

  test('submits the form and navigates to home page on success', async () => {
    const { login } = useAuth()
    const mockLogin = login as jest.MockedFunction<typeof login>

    render(<LoginPage />)

    const usernameField = await screen.findByPlaceholderText('Username')
    const passwordField = await screen.findByPlaceholderText('Password')
    const submitButton = await screen.findByRole('button')

    await userEvent.type(usernameField, 'testuser')
    await userEvent.type(passwordField, 'hashedPassword')
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser', 'hashedPassword')
      expect(document.location.pathname).toBe('/')
    })
  })

  test('shows an alert on a failed sign in', async () => {
    const { login } = useAuth()
    const mockLogin = login as jest.MockedFunction<typeof login>
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'))
    render(<LoginPage />)

    const usernameField = await screen.findByPlaceholderText('Username')
    const passwordField = await screen.findByPlaceholderText('Password')
    const submitButton = await screen.findByRole('button')

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation()

    await userEvent.type(usernameField, 'testuser')
    await userEvent.type(passwordField, 'wrongpassword')
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser', 'wrongpassword')
      expect(alertSpy).toHaveBeenCalledWith(
        'Password does not match the username'
      )
    })
  })
})
