import { createHashRouter } from 'react-router-dom'

import IndexLayout from '../layouts/IndexLayout'
import NotFound from '../Pages/NotFound'
import Home, { loaderHome } from '../Pages/Home'
import Create from '../Pages/Create'

const router = createHashRouter([
  {
    path: '/',
    element: <IndexLayout />,
    errorElement: <NotFound/>,
    children: [
      {
        index: true, 
        element: <Home />,
        loader: loaderHome
      },
      {
        path: '/create',
        element: <Create />
      }
    ]
  }
])

export default router