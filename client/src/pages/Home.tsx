import { useNavigate } from 'react-router-dom'
import { BasicPie } from '../components/ui/donutchart'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { URL_API } from '../utils/contants'

export default function Home() {
  const navigate = useNavigate()

  const [data, setData] = useState()
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get(`${URL_API}/infoMarcacion`);
        setData(response.data);
        console.log('data', data)
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    void fetchData()
  }, [])

  return (

    <main className='h-[90vh] 5cont_main flex flex-row items-center justify-center dark:text-white'>
       <BasicPie datos={data || {}}></BasicPie>
      <article className='flex flex-col items-center justify-center'>
      <h1 className='text-5xl font-bold mb-4 animate-bounce'>Welcome to Our Website!</h1>
      <p className='text-lg mb-8 text-center max-w-md'>
        Aplicativo en desarrollo para la gestión de empleados y sus marcaciones. generación de reportes y auditorias.
      </p>
      <button onClick={() => navigate('/empleados')} className='px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 transform hover:scale-105'>
        Get Started
      </button>
      </article>
    </main>
  )
}

