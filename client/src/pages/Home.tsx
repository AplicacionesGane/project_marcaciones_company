import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { ChartDonutMar } from '@/components/DonoutChart'
import { InfoMarcacion } from '@/types/Interfaces'
import { useEffect, useState } from 'react'
import { URL_API } from '@/utils/contants'
import { Users2Icon } from 'lucide-react'
import axios from 'axios'

export default function Home() {
  const [infoMarcacion, setInfoMarcacion] = useState<InfoMarcacion>()

  useEffect(() => {
    axios.get(`${URL_API}/infoMarcacion`)
      .then(res => setInfoMarcacion(res.data))
      .catch(err => console.error(err))
  }, [])


  return (
    <main className='grid grid-cols-2'>
      <ChartDonutMar items={infoMarcacion?.marcaciones} count={infoMarcacion?.count} />

      <Card className='p-4'>
        <CardTitle className='text-center py-1'>
          N° Empleados Activos
        </CardTitle>

        <CardContent className='flex flex-col items-center justify-center h-full gap-2'>
          <Users2Icon size={120} />
          <span className='bg-indigo-100 text-indigo-800 font-medium px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 text-3xl'>
            # {infoMarcacion?.totalPersona}
          </span>
        </CardContent>
      </Card>
    </main>
  )
}