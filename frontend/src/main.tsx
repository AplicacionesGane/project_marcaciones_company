import { AuthProvider } from './context/AuthProvider'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Router } from '@/routes/routes'
import { StrictMode } from 'react'
import axios from 'axios'
import './index.css'
import { ToastProvider } from '@radix-ui/react-toast'

axios.defaults.withCredentials = true

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={Router} />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>,
)
