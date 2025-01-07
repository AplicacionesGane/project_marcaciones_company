import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { ChartDonutMar } from '@/components/DonoutChart'
import { InfoMarcacion } from '@/types/Interfaces'
import { useEffect, useState } from 'react'
import { URL_API } from '@/utils/contants'
import { Users } from 'lucide-react'
import axios from 'axios'

export default function Home() {
  const [infoMarcacion, setInfoMarcacion] = useState<InfoMarcacion>()

  useEffect(() => {
    axios.get(`${URL_API}/infoMarcacion`)
      .then(res => setInfoMarcacion(res.data))
      .catch(err => console.error(err))
  }, [])

  const totalPArea = infoMarcacion?.areas.reduce((acc, ccr) => {
    return ccr.cant + acc
  }, 0)

  return (
    <main className='grid grid-rows-3 grid-flow-col gap-1'>
      <ChartDonutMar items={infoMarcacion?.marcaciones} count={infoMarcacion?.count} />

      <Card className='col-span-2 flex items-center justify-around gap-2 p-4'>
        <CardTitle className='text-center py-1'>
          N° Empleados Activos:
        </CardTitle>

        <Users size={30} />
        <span className='bg-indigo-100 px-2 py-1 rounded-md text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'>
          {infoMarcacion?.totalPersona}
        </span>

      </Card>

      <Card className='row-span-2 col-span-2 p-4'>
        <div className='flex justify-between px-6 font-semibold'>
          <h1>Descripción Áreas</h1>
          <h1>Empleados</h1>
        </div>

        <CardContent className='flex flex-col items-center justify-center h-full gap-2'>
          {
            infoMarcacion?.areas.map((a, i) => (
              <div className='flex w-full justify-between' key={i} >
                <p>{a.des === null ? 'Sin Área' : a.des}</p>
                <h1>{a.cant}</h1>
              </div>
            ))
          }
          <div className='flex w-full justify-between'>
            <p>Total:</p>
            <p>{totalPArea}</p>
          </div>

        </CardContent>
      </Card>
    </main >
  )
}