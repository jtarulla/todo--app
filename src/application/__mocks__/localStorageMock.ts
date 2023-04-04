import { LOCAL_STORAGE_LOGGED_IN_USER_KEY } from '@/constants'

export const localStorageMock = (() => {
  let store: Record<string, unknown> = {}

  return {
    getItem(key: string) {
      return store[key] || null
    },
    setItem(key: string, value: unknown) {
      store[key] = value?.toString()
    },
    clear() {
      store = {}
    },
    getLoggedInUser() {
      this.getItem(LOCAL_STORAGE_LOGGED_IN_USER_KEY)
    },
    setLoggedInUser(userId: string) {
      this.setItem(LOCAL_STORAGE_LOGGED_IN_USER_KEY, userId)
    },
    clearLoggedInUser() {
      localStorage.removeItem(LOCAL_STORAGE_LOGGED_IN_USER_KEY)
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})
