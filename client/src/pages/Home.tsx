import { URL_API } from "@/utils/contants"
import { useEffect, useState } from "react"
import axios from "axios"

interface InfoMarcacion {
  count: number
  stados: {
    [key: string]: number
  }
  totalPersona: number
}

export default function Home() {
  const [infoMarcacion, setInfoMarcacion] = useState<InfoMarcacion>()

  useEffect(() => {
    axios.get(`${URL_API}/infoMarcacion`)
      .then(res => setInfoMarcacion(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <main className='flex flex-col items-center justify-center first:space-y-8 h-screen'>
      <h1 className='text-4xl font-bold'>Información de marcaciones</h1>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <p>Total de marcaciones: {infoMarcacion?.count}</p>
        <p>Total de personas: {infoMarcacion?.totalPersona}</p>
      </div>
      {
        infoMarcacion && (
          <div className='flex flex-col items-center justify-center space-y-4'>
            {
              Object.keys(infoMarcacion.stados).map((key, index) => (
                <p key={index}>{key}: {infoMarcacion.stados[key]}</p>
              ))
            }
          </div>
        )
      }
    </main>
  )
}