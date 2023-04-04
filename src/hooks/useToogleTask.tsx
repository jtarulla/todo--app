import { useCallback } from 'react'

import { Task } from '@/domain/models/Task'
import { User } from '@/domain/models/User'

interface UseToggleTaskReturnType {
  handleToggleTask: (taskId: string) => void
}

const useToggleTask = (
  user: User | undefined,
  tasks: Task[],
  setTasks: (tasks: Task[]) => void
): UseToggleTaskReturnType => {
  const handleToggleTask = useCallback(
    (taskId: string) => {
      if (user) {
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
        user.tasks = updatedTasks
        setTasks(updatedTasks)
      }
    },
    [tasks, setTasks, user]
  )

  return { handleToggleTask }
}

export default useToggleTask
