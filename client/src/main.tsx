import { ThemeProvider } from '@context/theme/ThemeProvider'
import { AuthProvider } from '@context/auth/AuthProvider'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Router } from '@routes/index'
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
