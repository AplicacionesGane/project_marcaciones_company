import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { GrupoHorarioAsignado, GrupoVsTurno } from '@/types/interfaces'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Card } from '@/components/ui/card'
import { URL_API } from '@/utils/constants'
import { PlusIcon } from 'lucide-react'
import axios from 'axios'

function GrupovsTurno() {
  const [selectedGrupoHorarioId, setSelectedGrupoHorarioId] = useState<number | null>(null);
  const [options, setOptions] = useState<GrupoVsTurno | null>(null)
  const [fechtData, setFechtData] = useState(false)
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null);

  const [editInfo, setEditInfo] = useState<GrupoHorarioAsignado | null>(null)
  const [showEdit, setShowEdit] = useState(false)

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
          toast({ title: 'Asignación De Turno Exitosa', description: 'Se ha asignado el turno correctamente' })
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
          toast({ title: 'Eliminación Exitosa', description: 'Se ha eliminado el turno correctamente' })
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

  const handleEdit = (GpTur: GrupoHorarioAsignado) => {
    setEditInfo(GpTur)
    setShowEdit(true)
  }

  const handleUpdateGpTurno = (ev: FormEvent) => {
    ev.preventDefault();

    const fields = ev.currentTarget as HTMLFormElement;
    const turno = fields['turno'].value; // trae el id del turno seleccionado
    const grupoHorarioId = editInfo?.id;
    
    axios.put(`${URL_API}/updategrupovsturnos`, { idGH: grupoHorarioId, idTurno: turno })
      .then(response => {
        if (response.status === 200) {
          setFechtData(!fechtData)
          toast({ title: 'Actualización Exitosa', description: 'Se ha actualizado el Grupo-Turno correctamente' })
          cancelEdit()
        }
      })
      .catch(error => {
        console.log(error)
      })

  }

  const cancelEdit = () => {
    setShowEdit(false)
    setEditInfo(null)
  }

  const filteredAsignados = selectedGrupoHorarioId
    ? options?.asignados.filter(asign => asign.GrupoHorario.id === selectedGrupoHorarioId)
    : options?.asignados;

  return (
    <section className='flex flex-col h-screen relative'>

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
                    className='hover:bg-yellow-200 mx-1'
                    variant={'secondary'}
                    onClick={() => handleEdit(asign)}
                  >
                    Editar
                  </Button>
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

      {
        showEdit && editInfo && (
          <Card className='absolute shadow-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-20 py-4'>
            <form onSubmit={handleUpdateGpTurno}>
              <h1 className='text-center font-bold text-2xl pb-4'>Editar Asignación</h1>
              <div className='flex gap-4 py-1 items-center'>
                <Label>Turno Actual: </Label>
                <span className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300'>
                  {editInfo.Turno.descripcion}
                </span>
              </div>
              <div className='flex gap-4 py-1 items-center'>
                <Label>Grupo Horario: </Label>
                <span className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300'>
                  {editInfo.GrupoHorario.descripcion}
                </span>
              </div>
              <div className='flex gap-4 py-1 items-center'>
                <Label>Día Semana:</Label>
                <span className='bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300'>
                  {editInfo.diaSeman}
                </span>
              </div>

              <Separator />

              <div className='flex flex-col gap-2'>
                <Label className='text-lg pt-1'>Seleccione Nuevo Turno</Label>
                <select name='turno' id='turno' className='border px-4 py-2 rounded-md mb-2 text-black'>
                  <option value=''>
                    Seleccione Turno
                  </option>
                  {options?.horario.map(turno => (
                    <option key={turno.id} value={turno.id}>
                      {turno.descripcion}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex gap-2'>
                <Button
                  variant={'destructive'}
                  onClick={cancelEdit}
                >
                  Cancelar
                </Button>

                <Button
                  type='submit'
                  variant={'edit'}
                >
                  Guardar Cambios
                </Button>
              </div>
            </form>
          </Card>
        )
      }

    </section>
  )
}

export default GrupovsTurno;