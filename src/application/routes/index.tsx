import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import LoginPage from '@/application/pages/LoginPage'
import TasksPage from '@/application/pages/TasksPage'
import AuthenticatedRoute from '@/application/components/AuthenticatedRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AuthenticatedRoute />}>
        <Route path="/" element={<TasksPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </>
  )
)

export default router
