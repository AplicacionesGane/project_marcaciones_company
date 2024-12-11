import { BasicPie } from '@components/ui/donutchart'
import { InfoMarcacion } from '@interface/marcacion'
import { useEffect, useState } from 'react'
import { URL_API } from '@config/enviroments'
import axios from 'axios'

export default function Home() {
  const [data, setData] = useState<InfoMarcacion | undefined>(undefined)

  useEffect(() => {
    axios.get<InfoMarcacion>(`${URL_API}/infoMarcacion`)
      .then(res => setData(res.data))
      .catch(error => console.error(error))
  }, [])

  return (

    <main className='h-[90vh] 5cont_main flex flex-row items-center justify-center dark:text-white'>
      {
        data && <BasicPie datos={data}></BasicPie>
      }
    </main>
  )
}

