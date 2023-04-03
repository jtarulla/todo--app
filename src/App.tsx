import { RouterProvider } from 'react-router'

import routes from '@/application/routes'

function App() {
  return (
    <div className="app">
      <RouterProvider router={routes} />
    </div>
  )
}

export default App
