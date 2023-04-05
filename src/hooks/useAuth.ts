import { useCallback } from 'react'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

import { User } from '@/domain/models/User'
import {
  loadState,
  saveState,
  setLoggedInUser,
  clearLoggedInUser,
  getLoggedInUser,
} from '@/infraestructure/localStorage'
import { LOCAL_STORAGE_USERS_KEY } from '@/constants'

export const useAuth = () => {
  const login = useCallback(
    async (username: string, password: string): Promise<User> => {
      const users: User[] = loadState(LOCAL_STORAGE_USERS_KEY) || []

      let user = users.find((user) => user.username === username)
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10)
        user = {
          id: uuidv4(),
          username,
          password: hashedPassword,
          tasks: [],
        }
        users.push(user)
        saveState(LOCAL_STORAGE_USERS_KEY, users)
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid password')
      }

      setLoggedInUser(user.id)

      return user
    },
    []
  )

  const logout = () => {
    const users: User[] = loadState(LOCAL_STORAGE_USERS_KEY) || []
    const loggedInUserId = getLoggedInUser()
    const updatedUsers = users.map((user) =>
      user.id === loggedInUserId ? { ...user, tasks: [] } : user
    )

    saveState(LOCAL_STORAGE_USERS_KEY, updatedUsers)
    clearLoggedInUser()
  }

  return { login, logout }
}
