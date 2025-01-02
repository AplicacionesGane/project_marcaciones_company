import { MarcacionPersonaArea } from '../types/marcacion'
import { utils, ColInfo, writeFile } from 'xlsx'
import { Button } from './ui/button'
import { toast } from 'sonner'

interface Props {
  datos: MarcacionPersonaArea[]
  time1?: string
  time2?: string
}

const generateExcelData = (datos: MarcacionPersonaArea[], time1?: string, time2?: string): unknown[] => {
  const titulo = [{ A: `Reporte Marcaciones Fecha Inicial: ${time1} - Fecha Final: ${time2}` }]
  const headers = [
    {
      A: 'ID',
      B: 'Documento',
      C: 'Nombres',
      D: 'Apellidos',
      E: 'Fecha Marcación',
      F: 'Hora Marcación',
      G: 'Estado Marcación',
      I: 'Area'
    }
  ]

  const rows = datos.map((it) => ({
    A: it.id,
    B: it.documento,
    C: it.nombres,
    D: it.apellidos,
    E: it.fecha,
    F: it.hora,
    G: it.estado,
    I: it.area
  }))

  return [...titulo, ...headers, ...rows]
}

const createExcelFile = (data: unknown[]): void => {
  const libro = utils.book_new()
  const hoja = utils.json_to_sheet(data, { skipHeader: true })

  hoja['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }]

  const colWidths: ColInfo[] = [
    { width: 10 }, { width: 10 }, { width: 30 }, { width: 10 }, { width: 20 },
    { width: 10 }, { width: 10 }, { width: 20 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }
  ]

  hoja['!cols'] = colWidths
  utils.book_append_sheet(libro, hoja, 'Marcaciones')
  writeFile(libro, 'ReporteMarcaciones.xlsx')
}

export const BottonExporCartera = ({ datos, time1, time2 }: Props): JSX.Element => {
  const handleDownload = (): void => {
    const dataFinal = generateExcelData(datos, time1, time2)

    const promises = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ name: 'sonner' })
      }, 3000)
    })

    toast.promise(promises, {
      loading: 'Generando Archivo ...',
      description: 'Espere un momento',
      style: { background: '#fcd34d' },
      success: () => {
        createExcelFile(dataFinal)
        return 'Archivo Generado Correctamente'
      },
      error: 'Error al Generar Archivo'
    })
  }

  return (
    <Button onClick={handleDownload}>
      Exportar Excel
    </Button>
  )
}