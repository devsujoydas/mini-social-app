import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Pages/Root/Root.jsx'
import Login from './Pages/Login/Login.jsx'
import Signup from './Pages/Signup/Signup.jsx'
import Profile from './Pages/Profile/Profile.jsx'
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute.jsx'
import Home from './Pages/Home/Home.jsx'
import UpdateInfo from './Pages/UpdateInfo/UpdateInfo.jsx'
import PostDetailsUpdate from './Components/Posts/PostDetailsUpdate.jsx'
import Friends from './Components/Friends/Friends.jsx'
import FriendDetails from './Components/Friends/FriendDetails.jsx'
import ErrorPage from './Pages/ErrorPage/ErrorPage.jsx'
import PostDetails from './Components/Posts/PostDetails.jsx'
import UsersPostDetails from './Components/UsersPosts/UsersPostDetails.jsx'
import ChatBox from './Pages/ChatBox/ChatBox.jsx'
import AuthPrivateRoutes from './Pages/PrivateRoute/AuthPrivateRoutes.jsx'
import AuthProvider from './AuthProvider/AuthProvider.jsx'
import SavedPosts from './Pages/SavedPosts/SavedPosts.jsx'
import EventsPage from './Pages/EventsPage/EventsPage.jsx'
import Memories from './Pages/Memories/Memories.jsx'
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword.jsx'




const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Root /></PrivateRoute>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <PrivateRoute> <Home /></PrivateRoute>,
      },
      {
        path: "/profile",
        element: <PrivateRoute> <Profile /></PrivateRoute>,
      },
      {
        path: "/updateInfo/:id",
        element: <PrivateRoute> <UpdateInfo /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://mini-social-app-backend.vercel.app/updateInfo/${params.id}`)
      },
      {
        path: "/post/:id",
        element: <PrivateRoute> <PostDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://mini-social-app-backend.vercel.app/post/${params.id}`)
      },
      {
        path: "profile/post/:id",
        element: <PrivateRoute> <UsersPostDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://mini-social-app-backend.vercel.app/profile/post/${params.id}`)
      },
      {
        path: "/post/update/:id",
        element: <PrivateRoute> <PostDetailsUpdate /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://mini-social-app-backend.vercel.app/post/update/${params.id}`)
      },
      {
        path: "/friends",
        element: <PrivateRoute> <Friends /></PrivateRoute>,
      },
      {
        path: "/friends/:id",
        element: <PrivateRoute> <FriendDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://mini-social-app-backend.vercel.app/friends/${params.id}`)
      },
      {
        path: "/message/:id",
        element: <PrivateRoute> <ChatBox /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://mini-social-app-backend.vercel.app/message/${params.id}`)
      },
      {
        path: "/savedposts",
        element: <PrivateRoute> <SavedPosts /></PrivateRoute>
      },
      {
        path: "/eventsPage",
        element: <PrivateRoute> <EventsPage /></PrivateRoute>
      },
      {
        path: "/memories",
        element: <PrivateRoute> <Memories /></PrivateRoute>
      },
    ]
  },
  {
    path: "/login",
    element: <AuthPrivateRoutes><Login /></AuthPrivateRoutes>,
  },
  {
    path: "/forgotPass",
    element: <AuthPrivateRoutes><ForgotPassword /></AuthPrivateRoutes>,
  },
  {
    path: "/signup",
    element: <AuthPrivateRoutes>< Signup /></AuthPrivateRoutes>
  },

])

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
