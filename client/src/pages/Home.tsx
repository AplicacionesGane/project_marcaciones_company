import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <main className='h-[90vh] cont_main flex flex-col items-center justify-center dark:text-white'>
      <h1 className='text-5xl font-bold mb-4 animate-bounce'>Welcome to Our Website!</h1>
      <p className='text-lg mb-8 text-center max-w-md'>
        Aplicativo en desarrollo para la gestión de empleados y sus marcaciones. generación de reportes y auditorias.
      </p>
      <button onClick={() => navigate('/empleados')} className='px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 transform hover:scale-105'>
        Get Started
      </button>
    </main>
  )
}