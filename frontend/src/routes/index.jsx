import { createBrowserRouter } from 'react-router-dom'

import LayoutPublic from '../layout/LayoutPublic'
import Home, { loaderHome } from '../pages/Home'
import NotFound from '../pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: loaderHome
      },
    ]
  }
])