import { PlusIcon } from '../../../components/icons/PlusIcon'
import { GrupoVsTurno } from '../../../types/Interfaces'
import { useEffect, useRef, useState } from 'react'
import { URL_API } from '../../../utils/contants'
import { toast } from 'sonner'
import axios from 'axios'

export default function GrupovsTurno() {
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
    <section className='flex flex-col h-[92vh]'>

      <section className='flex justify-around py-2'>
        <div className='flex flex-col gap-2 justify-center border rounded-md px-4 shadow-md'>
          <p className='text-center'>Filtrar Grupos Horarios</p>
          <select onChange={handleChangeFiltro} className='border p-1 rounded-md'>
            <option value="">Seleccione un Grupo Horario</option>
            {options?.grupoHorario.map(grupo => (
              <option key={grupo.id} value={grupo.id}>
                {grupo.descripcion}
              </option>
            ))}
          </select>
        </div>

        <form ref={formRef} className='overflow-y-auto flex max-h-32 w-max px-4 gap-8 border rounded-md shadow-md' onSubmit={handleSubmit}>

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
      </section>

      <section className='shadow-md overflow-y-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-blue-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th className='px-4 py-2'>ID</th>
              <th className='px-4 py-2'>Día</th>
              <th className='px-4 py-2'>Grupo Horario</th>
              <th className='px-4 py-2'>Turno</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAsignados?.map(asign => (
              <tr key={asign.id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <th className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {asign.id}
                </th>
                <th scope='row' className='px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {asign.diaSeman}
                </th>
                <td className='px-3 py-2'>
                  {asign.GrupoHorario.descripcion}
                </td>
                <td className='px-3 py-2'>
                  {asign.Turno.descripcion}
                </td>
                <td className='px-3 py-2'>
                  <button onClick={() => handleDelete(asign.id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>


    </section>
  )
}