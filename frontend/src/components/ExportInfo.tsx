import { Marcaciones } from '@/types/Marcaciones'
import { utils, ColInfo, writeFile } from 'xlsx'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface Props {
  datos: Marcaciones[]
  time1?: string
  time2?: string
}

const generateExcelData = (datos: Marcaciones[], time1?: string, time2?: string): unknown[] => {
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
    A: it.Id,
    B: it.codigo,
    C: it.Persona.nombres,
    D: it.Persona.apellidos,
    E: it.Fecha,
    F: it.Hora,
    G: it.estado,
    I: it.Persona.Area?.descripcion
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
  const { toast } = useToast()

  const handleDownload = (): void => {
    const data = generateExcelData(datos, time1, time2)
    createExcelFile(data)
  }

  return (
    <Button
      onClick={() => {
        toast({
          title: "Generando Archivo Excel ...",
          description: "Por favor espere unos segundos",
        })
        setTimeout(() => {
          handleDownload()
          toast({
            title: "Archivo Excel Generado",
            description: "El archivo se ha generado correctamente",
          })
        }, 3000)
      }}>
      Exportar Excel
    </Button>
  )
}