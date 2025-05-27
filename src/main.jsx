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
import FriendDetails from './Components/Friends/FriendDetails.jsx'




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
        element: <Profile />,
      },
      {
        path: "/updateInfo/:id",
        element: <UpdateInfo />,
        loader: ({ params }) => fetch(`https://mini-social-app-backend.vercel.app/updateInfo/${params.id}`)
      },
      {
        path: "/post/:id",
        element: <PostDetails />,
        loader: ({ params }) => fetch(`https://mini-social-app-backend.vercel.app/post/${params.id}`)
      },
      {
        path: "/post/update/:id",
        element: <PostDetailsUpdate />,
        loader: ({ params }) => fetch(`https://mini-social-app-backend.vercel.app/post/update/${params.id}`)
      },
      {
        path: "/friends",
        element: <Friends />,
      },
      {
        path: "/profiles/:id",
        element: <FriendDetails />,
        loader: ({ params }) => fetch(`https://mini-social-app-backend.vercel.app/profiles/${params.id}`)
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
