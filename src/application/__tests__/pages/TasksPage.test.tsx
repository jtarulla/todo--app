import { render, userEvent, fireEvent, screen, waitFor } from '@/test-utils'
import { localStorageMock } from '@/application/__mocks__/localStorageMock'

import TasksPage from '@/application/pages/TasksPage'
import { LOCAL_STORAGE_USERS_KEY } from '@/constants'

const initialUsers = [
  {
    id: 'test-user-id',
    username: 'test-user',
    password: 'test-password',
    tasks: [],
  },
]

describe('TasksPage', () => {
  beforeEach(() => {
    localStorageMock.setItem(
      LOCAL_STORAGE_USERS_KEY,
      JSON.stringify(initialUsers)
    )
    localStorageMock.setLoggedInUser(JSON.stringify(initialUsers[0].id))
  })

  afterEach(() => {
    localStorageMock.clear()
  })

  test('adds a task when user types and presses Enter', async () => {
    render(<TasksPage />)
    const taskInput = screen.getByPlaceholderText('Add a task and ENTER')

    await userEvent.type(taskInput, 'New Task test')
    await fireEvent.keyDown(taskInput, { key: 'Enter', code: 'Enter' })

    await waitFor(() => {
      const newTask = screen.getByText('New Task test')
      expect(newTask).toBeInTheDocument()
    })
  })

  test('toggles task completion when user clicks the checkbox', async () => {
    render(<TasksPage />)
    const taskInput = screen.getByPlaceholderText('Add a task and ENTER')

    await userEvent.type(taskInput, 'New Task 2')
    await fireEvent.keyDown(taskInput, { key: 'Enter', code: 'Enter' })

    const taskCheckbox = screen.getByRole('checkbox')
    userEvent.click(taskCheckbox)

    await waitFor(() => {
      const completedTask = screen.getByText('New Task 2')
      expect(completedTask).toHaveClass('task-completed')
    })
  })

  test('deletes a task when user clicks the delete button', async () => {
    render(<TasksPage />)
    const taskInput = screen.getByPlaceholderText('Add a task and ENTER')

    await userEvent.type(taskInput, 'Task to delete')
    await fireEvent.keyDown(taskInput, { key: 'Enter', code: 'Enter' })

    const deleteButton = screen.getByTestId('DeleteIcon')

    userEvent.click(deleteButton)

    await waitFor(() => {
      expect(screen.queryByText('Task to delete')).not.toBeInTheDocument()
    })
  })
})
