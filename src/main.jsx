import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './AuthProvider/AuthProvider.jsx'
import { router } from './routes/routes.jsx'
import './index.css'
import Lenis from 'lenis'




createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
