import { LogoutAndDeleteToken } from '../../services/LogOut'
import { useAuth } from '../../auth/AuthContext'
import ThemeToggleButton from '../ThemeToggle'
import { useNavigate } from 'react-router-dom'
import { LinkNav } from './LinkNav'

const NavBar = () => {
  const { setIsAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    LogoutAndDeleteToken()
    setIsAuthenticated(false)
    navigate('/')
  }

  return (
    <nav className='bg-white dark:bg-gray-900 border-b border-gray-200 xl:text-xs 2xl:text-base px-10'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-1'>
        <figure className='flex gap-2'>
          <img src="logo.webp" className='xl:h-8 2xl:h-10' alt='Logo Gestión Humana' />
          <span className='self-center xl:text-base font-semibold whitespace-nowrap dark:text-white'>Gestión Humana Multired</span>
        </figure>

        <div className='w-full md:block md:w-auto' id='navbar-multi-level'>
          <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <LinkNav link='/' text='Inicio' />
            <LinkNav link='/empleados' text='Empleados' />
            <LinkNav link='/marcacion' text='Marcación' />
            <LinkNav link='/audit-marcacion' text='Audit Marcación' />
            <LinkNav link='/opciones' text='Opciones' />
          </ul>
        </div>

        <div className='flex items-center justify-center'>
          <ThemeToggleButton />
        </div>

        <div>
          <button onClick={() => handleLogout()}
            className='flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-gray-500 dark:focus:ring-gray-500'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1' />
            </svg>
          </button>
        </div>
      </div>
    </nav>

  )
}

export default NavBar