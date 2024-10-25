import { BasicPie } from '../components/ui/donutchart'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { URL_API } from '../utils/contants'

export default function Home() {

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
    </main>
  )
}

