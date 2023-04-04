import LogoutButton from '@/application/components/LogoutButton'
import TaskList from '@/application/components/TaskList'
import TaskInput from '@/application/components/TaskInput'
import TasksContext from '@/application/contexts/TasksContext'
import useTasks from '@/hooks/useTasks'
import useToggleTask from '@/hooks/useToogleTask'

const TasksPage = () => {
  const { user, tasks, setTasks } = useTasks()
  const { handleToggleTask } = useToggleTask(user, tasks, setTasks)

  return (
    <div>
      <LogoutButton />
      <h1>{user?.username.toUpperCase()}'s TASKS</h1>
      <TasksContext.Provider
        value={{ user, tasks, handleToggleTask, setTasks }}
      >
        <TaskInput />
        <TaskList />
      </TasksContext.Provider>
    </div>
  )
}

export default TasksPage
