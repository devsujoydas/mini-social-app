import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Pages/Root/Root.jsx'
import Login from './Pages/Login/Login.jsx'
import Signup from './Pages/Signup/Signup.jsx'
import Profile from './Pages/Profile/Profile.jsx'
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute.jsx'
import AuthProvider from './Pages/PrivateRoute/AuthProvider.jsx'
import Home from './Pages/Home/Home.jsx'
import UpdateInfo from './Pages/UpdateInfo/UpdateInfo.jsx'




const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Root /></PrivateRoute>,
    children: [
      {
        path: "/",
        element: <Home />,

      },
      {
        path: "/profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
      }, {
        path: "/updateInfo/:id",
        element: <PrivateRoute><UpdateInfo /></PrivateRoute>,
        hydrateFallbackElement: <loader />,

        loader: ({ params }) => fetch(`http://localhost:3000/updateInfo/${params.id}`)
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: < Signup />,
  },

])

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
