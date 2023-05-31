import { createBrowserRouter } from 'react-router-dom'

import IndexLayout from '../layouts/IndexLayout'
import NotFound from '../Pages/NotFound'
import Home, { loaderHome } from '../Pages/Home'
import Create from '../Pages/Create'
import Update, { loaderUpdate } from '../Pages/Update'

const router = createBrowserRouter([
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
      },
      {
        path: '/update/:id',
        element: <Update />,
        loader: loaderUpdate
      }
    ]
  }
])

export default router