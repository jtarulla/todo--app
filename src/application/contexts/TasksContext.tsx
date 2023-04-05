import { createContext, useContext } from 'react'

import { User } from '@/domain/models/User'
import { Task } from '@/domain/models/Task'

interface TasksContextData {
  user: User | undefined
  tasks: Task[]
  handleToggleTask: (taskId: string) => void
  handleDeleteTask: (taskId: string) => void
  setTasks: (tasks: Task[]) => void
}

const TasksContext = createContext<TasksContextData>({} as TasksContextData)

export const useTasksContext = () => useContext(TasksContext)

export default TasksContext
