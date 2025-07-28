import { createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login/Login.jsx'
import Signup from '../Pages/Signup/Signup.jsx'
import PrivateRoutes from '../Pages/PrivateRoutes/PrivateRoutes.jsx';
import Layout from '../Layout/Layout.jsx';
import Home from '../Pages/Home/Home.jsx';
import Profile from '../Pages/Profile/Profile.jsx';
import UpdateInfo from '../Pages/UpdateInfo/UpdateInfo.jsx';
import PostDetails from '../Components/Posts/PostDetails.jsx';
import UsersPostDetails from '../Components/UsersPosts/UsersPostDetails.jsx';
import PostDetailsUpdate from '../Components/Posts/PostDetailsUpdate.jsx';
import FriendsPage from '../Pages/Friends/FriendsPage.jsx';
import FriendDetails from '../Pages/Friends/FriendDetails.jsx';
import ChatBox from '../Pages/ChatBox/ChatBox.jsx';
import SavedPosts from '../Pages/SavedPosts/SavedPosts.jsx';
import EventsPage from '../Pages/EventsPage/EventsPage.jsx';
import Memories from '../Pages/Memories/Memories.jsx';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword.jsx';
import ErrorPage from '../Pages/ErrorPage/ErrorPage.jsx';


const BASE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes><Layout /></PrivateRoutes>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PrivateRoutes> <Home /></PrivateRoutes>,
      },
      {
        path: "/profile",
        element: <PrivateRoutes> <Profile /></PrivateRoutes>,
      },
      {
        path: "/updateInfo/:id",
        element: <PrivateRoutes> <UpdateInfo /></PrivateRoutes>,
        loader: ({ params }) => fetch(`${BASE_BACKEND_URL}/updateInfo/${params.id}`)
      },
      {
        path: "/post/:id",
        element: <PrivateRoutes> <PostDetails /></PrivateRoutes>,
        loader: ({ params }) => fetch(`${BASE_BACKEND_URL}/post/${params.id}`)
      },
      {
        path: "profile/post/:id",
        element: <PrivateRoutes> <UsersPostDetails /></PrivateRoutes>,
        loader: ({ params }) => fetch(`${BASE_BACKEND_URL}/profile/post/${params.id}`)
      },
      {
        path: "/post/update/:id",
        element: <PrivateRoutes> <PostDetailsUpdate /></PrivateRoutes>,
        loader: ({ params }) => fetch(`${BASE_BACKEND_URL}/post/update/${params.id}`)
      },
      {
        path: "/friends",
        element: <PrivateRoutes> <FriendsPage /></PrivateRoutes>,
      },
      {
        path: "/friends/:id",
        element: <PrivateRoutes> <FriendDetails /></PrivateRoutes>,
        loader: async ({ params }) => await fetch(`${BASE_BACKEND_URL}/friends/${params.id}`)
      },
      {
        path: "/message/:id",
        element: <PrivateRoutes> <ChatBox /></PrivateRoutes>,
        loader: async ({ params }) => await fetch(`${BASE_BACKEND_URL}/message/${params.id}`)
      },
      {
        path: "/savedposts",
        element: <PrivateRoutes> <SavedPosts /></PrivateRoutes>
      },
      {
        path: "/eventsPage",
        element: <PrivateRoutes> <EventsPage /></PrivateRoutes>
      },
      {
        path: "/memories",
        element: <PrivateRoutes> <Memories /></PrivateRoutes>
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/forgotPass",
    element: <ForgotPassword />,
  },
  {
    path: "/signup",
    element: < Signup />
  },

])
