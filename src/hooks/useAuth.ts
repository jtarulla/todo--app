import { useCallback } from 'react'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

import { User } from '@/domain/models/User'
import {
  loadState,
  saveState,
  setLoggedInUser,
  clearLoggedInUser,
} from '@/infraestructure/localStorage'

const USERS_KEY = 'users'

export const useAuth = () => {
  const login = useCallback(
    async (username: string, password: string): Promise<User> => {
      const users: User[] = loadState(USERS_KEY) || []

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
        saveState(USERS_KEY, users)
      } else if (!(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid password')
      }

      setLoggedInUser(user.id)

      return user
    },
    []
  )

  const logout = () => {
    clearLoggedInUser()
  }

  return { login, logout }
}
