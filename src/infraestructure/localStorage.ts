const LOGGED_IN_USER_KEY = 'loggedInUser'

export const loadState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
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

export const getLoggedInUser = () => {
  return loadState(LOGGED_IN_USER_KEY)
}

export const setLoggedInUser = (userId: string) => {
  saveState(LOGGED_IN_USER_KEY, userId)
}

export const clearLoggedInUser = () => {
  localStorage.removeItem(LOGGED_IN_USER_KEY)
}
