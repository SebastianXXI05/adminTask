import { createBrowserRouter } from 'react-router-dom'

import IndexLayout from '../layouts/IndexLayout'
import NotFound from '../Pages/NotFound'
import Home from '../Pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexLayout />,
    errorElement: <NotFound/>,
    children: [
      {
        index: true, 
        element: <Home />
      }
    ]
  }
])

export default router