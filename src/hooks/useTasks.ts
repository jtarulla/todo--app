import { useEffect, useState } from 'react'

import { Task } from '@/domain/models/Task'
import { User } from '@/domain/models/User'
import { getLoggedInUser, loadState } from '@/infraestructure/localStorage'
import { LOCAL_STORAGE_USERS_KEY } from '@/constants'
import { saveState } from '@/infraestructure/localStorage'
interface UseTasksReturnType {
  tasks: Task[]
  user: User | undefined
  setTasks: (tasks: Task[]) => void
}

const useTasks = (): UseTasksReturnType => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const users = loadState(LOCAL_STORAGE_USERS_KEY) || []
    const loggedInUserId = getLoggedInUser()
    const loggedInUser = users.find((user: User) => user.id === loggedInUserId)

    if (loggedInUser) {
      setTasks(loggedInUser.tasks)
      setUser(loggedInUser)
    }
  }, [])

  useEffect(() => {
    if (user) {
      const users = loadState(LOCAL_STORAGE_USERS_KEY) || []
      const updatedUsers = users.map((u: User) =>
        u.id === user.id ? { ...u, tasks } : u
      )
      saveState(LOCAL_STORAGE_USERS_KEY, updatedUsers)
    }
  }, [tasks, user])

  return { tasks, user, setTasks }
}

export default useTasks
