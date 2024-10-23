import { FormEvent, useEffect, useRef, useState } from 'react';
import { ModalDelete } from '../../../components/ModalDelete';
import { type Turnos } from '../../../types/Interfaces';
import { Label } from '../../../components/ui/Label';
import { Input } from '../../../components/ui/Input';
import { URL_API } from '../../../utils/contants';
import axios from 'axios';
import { toast } from 'sonner';


export default function Turnos() {
  const [turnos, setturnos] = useState<Turnos[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [request, setRequest] = useState<boolean>(false);
  const [turnoDelete, setTurnoDelete] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get(`${URL_API}/turnos`)
      .then(response => {
        setturnos(response.data)
        setRequest(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [request]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const fields = Object.fromEntries(new window.FormData(e.target as HTMLFormElement));

    const turno = {
      codigo: fields.codigo,
      descripcion: fields.nombre_turno,
      hora_inicio: fields.hora_inicio,
      hora_fin: fields.hora_fin,
      teorico: fields.teorico,
      hora_inicio_break: fields.hora_inicio_break,
      hora_fin_break: fields.hora_fin_break,
      tiempo_breack: fields.tiempo_breack,
      conceptos: fields.conceptos
    }

    axios.post(`${URL_API}/turno`, turno)
      .then(response => {
        if (response.status === 201) {
          toast.success('El turno se creó correctamente', { description: 'Turno creado' });
          setRequest(true);
          formRef.current?.reset();
        }
      })
      .catch(error => {
        console.log(error);
        toast.error(error.response?.data?.message || 'Error', { description: 'Error al crear el turno' });
      })
  }

  const confirmDeleteTurno = () => {
    if (turnoDelete !== null) {
      axios.delete(`${URL_API}/turno/${turnoDelete}`)
        .then(response => {
          if (response.status === 200) {
            toast.success('El cargo se eliminó correctamente', { description: 'turno eliminado' });
            setRequest(true);
          }
        })
        .catch(error => {
          console.log(error);
          toast.error(error.response?.data?.message || 'Error', { description: 'Error al eliminar el turno' });
        })
        .finally(() => {
          closeModal();
        });
    }
  };

  const openModal = (id: number) => {
    setTurnoDelete(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setTurnoDelete(null);
  };


  return (
    <section className='p-1 flex flex-col h-[92vh]'>
      <div className='h-[84vh] overflow-y-auto'>
        <table className='w-full text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto'>
          <thead className='text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th className='px-3 py-2 text-xs'>CODIGO</th>
              <th className='px-3 py-2 text-xs'>Nombre turno</th>
              <th className='px-3 py-2 text-xs'>Horas Total Día</th>
              <th className='px-3 py-2 text-xs'>Hora Inicio</th>
              <th className='px-3 py-2 text-xs'>Hora Fin</th>
              <th className='px-3 py-2 text-xs'>Hora Inicio Break</th>
              <th className='px-3 py-2 text-xs'>Hora Final Break</th>
              <th className='px-3 py-2 text-xs'>Tiempo Breack</th>
              <th className='px-3 py-2 text-xs'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              turnos.map(turno => (
                <tr key={turno.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700  '>
                  <td className='px-3 py-1 text-xs'>{turno.codigo}</td>
                  <td className='px-3 py-1 text-xs'>{turno.descripcion}</td>
                  <td className='px-3 py-1 text-xs'>{turno.teorico.split(':', 1)} h</td>
                  <td className='px-3 py-1 text-xs'>{turno.hora_inicio}</td>
                  <td className='px-3 py-1 text-xs'>{turno.hora_fin}</td>
                  <td className='px-3 py-1 text-xs'>{turno.hora_inicio_break}</td>
                  <td className='px-3 py-1 text-xs'>{turno.hora_fin_break}</td>
                  <td className='px-3 py-1 text-xs'>{turno.tiempo_breack}</td>
                  <td className='px-3 py-1 text-xs flex gap-2'>
                    <button className='bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded-md' onClick={() => openModal(turno.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <section className='mt-auto border rounded-md bg-gray-200 py-2 shadow-md'>
        <form ref={formRef} onSubmit={ev => handleSubmit(ev)}>

          <section className='grid grid-cols-4 gap-1 px-2'>
            <div>
              <Label name='codigo'>Codigo</Label>
              <Input type='text' name='codigo' id='codigo' required />
            </div>

            <div>
              <Label name='nombre_turno' >Nombre Turno</Label>
              <Input type='text' name='nombre_turno' id='nombre_turno' required />
            </div>

            <div>
              <Label name='hora_inicio' >Hora Inicio turno</Label>
              <Input type='time' name='hora_inicio' id='hora_inicio' required />
            </div>

            <div>
              <Label name='hora_fin' >Hora Fin turno</Label>
              <Input type='time' name='hora_fin' id='hora_fin' required />
            </div>

            <div>
              <Label name='teorico' >Horas Total Día</Label>
              <Input type='text' name='teorico' id='teorico' required />
            </div>

            <div>
              <Label name='hora_inicio_break' >Hora Inicio Break</Label>
              <Input type='time' name='hora_inicio_break' id='hora_inicio_break' />
            </div>

            <div>
              <Label name='hora_fin_break' >Hora Final Break</Label>
              <Input type='time' name='hora_fin_break' id='hora_fin_break' />
            </div>

            <div>
              <Label name='tiempo_breack' >Tiempo Break</Label>
              <Input type='text' name='tiempo_breack' id='tiempo_breack' />
            </div>

          </section>

          <button type='submit' className='bg-green-600 mt-1 text-white text-xl font-semibold rounded-md hover:bg-green-700 py-1 mx-2 px-4'>
            Crear Turno
          </button>
        </form>
      </section>

      {modalIsOpen && <ModalDelete funAction={confirmDeleteTurno} onCancel={closeModal} />}

    </section>
  );
}