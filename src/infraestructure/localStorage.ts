import { LOCAL_STORAGE_LOGGED_IN_USER_KEY } from '@/constants'

export const loadState = <T>(key: string): T | undefined => {
  try {
    const serializedState = localStorage.getItem(key)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState) as T
  } catch (error) {
    throw `Failed to load data from localStorage: ${error}`
  }
}

export const saveState = <T>(key: string, state: T): void => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(key, serializedState)
  } catch (error) {
    throw `Failed to save data from localStorage: ${error}`
  }
}

export const getLoggedInUser = (): string | undefined => {
  return loadState(LOCAL_STORAGE_LOGGED_IN_USER_KEY)
}

export const setLoggedInUser = (userId: string): void => {
  saveState(LOCAL_STORAGE_LOGGED_IN_USER_KEY, userId)
}

export const clearLoggedInUser = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_LOGGED_IN_USER_KEY)
}
