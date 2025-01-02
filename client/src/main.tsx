import { ThemeProvider } from '@/context/ThemeProvider'
import { AuthProvider } from '@/auth/AuthContext'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Router } from '@/routes'
import axios from 'axios'
import './index.css'

axios.defaults.withCredentials = true

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ThemeProvider>
      <RouterProvider router={Router} />
    </ThemeProvider>
  </AuthProvider>
)
