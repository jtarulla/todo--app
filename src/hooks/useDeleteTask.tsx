import { useCallback } from 'react'

import { Task } from '@/domain/models/Task'
import { User } from '@/domain/models/User'

interface UseDeleteTaskReturnType {
  handleDeleteTask: (taskId: string) => void
}

const useDeleteTask = (
  user: User | undefined,
  tasks: Task[],
  setTasks: (tasks: Task[]) => void
): UseDeleteTaskReturnType => {
  const handleDeleteTask = useCallback(
    (taskId: string) => {
      if (user) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId)
        user.tasks = updatedTasks
        setTasks(updatedTasks)
      }
    },
    [tasks, setTasks, user]
  )

  return { handleDeleteTask }
}

export default useDeleteTask
