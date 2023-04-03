import { createBrowserRouter } from 'react-router-dom'

import LoginPage from '@/application/pages/Login.page'

const router = createBrowserRouter([{ path: '/login', element: <LoginPage /> }])

export default router
