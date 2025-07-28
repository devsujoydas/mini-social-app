import { createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login/Login.jsx';
import Signup from '../Pages/Signup/Signup.jsx';
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
import PrivateRoutes from './PrivateRoutes.jsx';
import AuthPrivateRoutes from './AuthPrivateRoutes.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoutes><Layout /></PrivateRoutes>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/updateInfo/:id',
        element: <UpdateInfo />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_BACKEND_URL}/updateInfo/${params.id}`),
      },
      {
        path: '/post/:id',
        element: <PostDetails />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_BACKEND_URL}/post/${params.id}`),
      },
      {
        path: 'profile/post/:id',
        element: <UsersPostDetails />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_BACKEND_URL}/profile/post/${params.id}`),
      },
      {
        path: '/post/update/:id',
        element: <PostDetailsUpdate />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_BACKEND_URL}/post/update/${params.id}`),
      },
      {
        path: '/friends',
        element: <FriendsPage />,
      },
      {
        path: '/friends/:id',
        element: <FriendDetails />,
        loader: async ({ params }) => await fetch(`${import.meta.env.VITE_BACKEND_URL}/friends/${params.id}`),
      },
      {
        path: '/message/:id',
        element: <ChatBox />,
        loader: async ({ params }) => await fetch(`${import.meta.env.VITE_BACKEND_URL}/message/${params.id}`),
      },
      {
        path: '/savedposts',
        element: <SavedPosts />,
      },
      {
        path: '/eventsPage',
        element: <EventsPage />,
      },
      {
        path: '/memories',
        element: <Memories />,
      },
    ],
  },
  {
    path: '/login',
    element: <AuthPrivateRoutes><Login /></AuthPrivateRoutes>
  },
  {
    path: '/signup',
    element: <AuthPrivateRoutes><Signup /></AuthPrivateRoutes>
  },
  {
    path: '/forgotPass',
    element: <AuthPrivateRoutes><ForgotPassword /></AuthPrivateRoutes>
  },
]);
