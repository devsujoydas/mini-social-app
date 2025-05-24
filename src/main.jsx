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
import PostDetails from './Components/Posts/PostDetails.jsx'
import PostDetailsUpdate from './Components/Posts/PostDetailsUpdate.jsx'
import Friends from './Components/Friends/Friends.jsx'




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
        path: "/profile/:id",
        element: <PrivateRoute><Profile /></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/profile/${params.id}`)
      },
      {
        path: "/updateInfo/:id",
        element: <PrivateRoute><UpdateInfo /></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/updateInfo/${params.id}`)
      },
      {
        path: "/post/:id",
        element: <PrivateRoute><PostDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/post/${params.id}`)
      },
      {
        path: "/post/update/:id",
        element: <PrivateRoute><PostDetailsUpdate /></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/post/update/${params.id}`)
      },
      {
        path: "/friends",
        element: <PrivateRoute><Friends /></PrivateRoute>,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: < Signup />
  },

])

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
