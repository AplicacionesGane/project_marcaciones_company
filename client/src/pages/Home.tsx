import { Component } from "@/components/DonoutChart"
import { useEffect, useState } from "react"
import { URL_API } from "@/utils/contants"
import axios from "axios"
import { Card } from "@/components/ui/card"

interface Marcacion {
  id: number
  marcacion: string
  cantidad: number
}

interface InfoMarcacion {
  count: number
  marcaciones: Marcacion[]
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
    <main className=''>
      <Component items={infoMarcacion?.marcaciones} count={infoMarcacion?.count} />
      <Card>
        test 1
      </Card>
      <Card>
        test 2
      </Card>
      <Card>
        test 1
      </Card>
      <Card>
        test 2
      </Card>
      <Card>
        test 1
      </Card>
    </main>
  )
}