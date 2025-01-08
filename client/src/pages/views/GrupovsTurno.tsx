import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PlusIcon } from '@/components/icons/PlusIcon'
import { Separator } from '@/components/ui/separator'
import { useEffect, useRef, useState } from 'react'
import { GrupoVsTurno } from '@/types/Interfaces'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { URL_API } from '@/utils/contants'
import { toast } from 'sonner'
import axios from 'axios'

function GrupovsTurno() {
  const [selectedGrupoHorarioId, setSelectedGrupoHorarioId] = useState<number | null>(null);
  const [options, setOptions] = useState<GrupoVsTurno | null>(null)
  const [fechtData, setFechtData] = useState(false)
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    axios.get(`${URL_API}/grupovsturnos`)
      .then(response => {
        setOptions(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [fechtData])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    const grupoHorario = form['grupoHorario'].value
    const turno = form['turno'].value
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
      .filter(dia => form[dia].checked)
      .map(dia => dia[0].toUpperCase() + dia.slice(1))

    if (!grupoHorario || !turno || !dias.length) {
      alert('Debe seleccionar grupo, turno y al menos un día')
      return
    }

    axios.post(`${URL_API}/creategpvstur`, { grupoHorario, turno, dias })
      .then(response => {
        if (response.status === 201) {
          setFechtData(!fechtData)
          formRef.current?.reset()
          toast.success('Asignación De Turno Exitosa', { description: 'Se ha asignado el turno correctamente' })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleDelete = (id: number) => {
    axios.delete(`${URL_API}/grupovsturnos/${id}`)
      .then(response => {
        if (response.status === 200) {
          setFechtData(!fechtData)
          toast.success('Eliminación Exitosa', { description: 'Se ha eliminado el turno correctamente' })
          formRef.current?.reset()
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleChangeFiltro = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setSelectedGrupoHorarioId(id);
  };

  const filteredAsignados = selectedGrupoHorarioId
    ? options?.asignados.filter(asign => asign.GrupoHorario.id === selectedGrupoHorarioId)
    : options?.asignados;

  return (
    <section className='flex flex-col h-screen'>

      <h1 className='text-2xl text-center text-gray-700 dark:text-gray-200 font-semibold mb-1'>
        Asignación Turnos - Grupos
      </h1>

      <Card className='flex gap-2'>
        <section className='flex flex-col gap-2 justify-center px-2'>
          <Label className='text-center'>Filtrar Grupos</Label>
          <select onChange={handleChangeFiltro} className='border px-4 py-2 rounded-md'>
            <option value="">Seleccione Grupo</option>
            {options?.grupoHorario.map(grupo => (
              <option key={grupo.id} value={grupo.id}>
                {grupo.descripcion}
              </option>
            ))}
          </select>
        </section>

        <Separator orientation='vertical' />

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='flex gap-2'
        >
          <section className='flex flex-col gap-2 justify-center'>
            <select name='grupoHorario' id='grupoHorario' className='border px-4 py-2 rounded-md'>
              <option value=''>
                Seleccione Grupo
              </option>
              {options?.grupoHorario.map(grupo => (
                <option key={grupo.id} value={grupo.id}>
                  {grupo.descripcion}
                </option>
              ))}
            </select>

            <select name='turno' id='turno' className='border px-4 py-2 rounded-md'>
              <option value=''>
                Seleccione Turno
              </option>
              {options?.horario.map(turno => (
                <option key={turno.id} value={turno.id}>
                  {turno.descripcion}
                </option>
              ))}
            </select>

          </section>

          <fieldset className='grid grid-cols-4 py-4 gap-2'>
            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(dia => (
              <div key={dia} className='flex items-center'>
                <input type='checkbox' name={dia} id={dia} className='h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500' />
                <label htmlFor={dia} className='ml-2 block text-sm text-gray-700'>{dia}</label>
              </div>
            ))}
          </fieldset>

          <button type='submit' className='my-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-1'>
            <span>Agregar</span>
            <PlusIcon />
          </button>

        </form>
      </Card>

      <Separator />

      <section className='h-[80vh] overflow-y-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Día</TableHead>
              <TableHead>Grupo Horario</TableHead>
              <TableHead>Turno</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAsignados?.map(asign => (
              <TableRow key={asign.id}>
                <TableCell>
                  {asign.id}
                </TableCell>
                <TableCell>
                  {asign.diaSeman}
                </TableCell>
                <TableCell>
                  {asign.GrupoHorario.descripcion}
                </TableCell>
                <TableCell>
                  {asign.Turno.descripcion}
                </TableCell>
                <TableCell>
                  <Button
                    className='hover:bg-red-200'
                    variant={'secondary'}
                    onClick={() => handleDelete(asign.id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

    </section>
  )
}

export default GrupovsTurno;