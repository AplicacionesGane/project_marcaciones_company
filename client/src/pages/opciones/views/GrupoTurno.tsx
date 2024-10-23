import { PlusIcon } from '../../../components/icons/PlusIcon';
import { ModalDelete } from '../../../components/ModalDelete';
import { GrupoTurnos } from '../../../types/Interfaces';
import { FormEvent, useEffect, useState } from 'react';
import { URL_API } from '../../../utils/contants';
import { toast } from 'sonner';
import axios from 'axios';

export default function GrupoTurno() {
  const [turnoGrupo, setTurnoGrupo] = useState<GrupoTurnos[]>([]);
  const [areaToDelete, setAreaToDelete] = useState<number | null>(null);

  const [request, setRequest] = useState<boolean>(false);

  const [codigo, setCodigo] = useState<string>('');
  const [nombreGrupoTurno, setNombreGrupoTurno] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get(`${URL_API}/grupo-turnos`)
      .then(response => {
        setTurnoGrupo(response.data)
        // setRequest(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [request]);

  const handleNewGrupoTurno = (e: FormEvent) => {
    e.preventDefault();

    axios.post(`${URL_API}/grupo-turno`, { codigo, nombre: nombreGrupoTurno })
      .then(response => {
        console.log(response.data)
        if (response.status === 201) {
          toast.success('El área se creo correctamente', { description: 'Área creada' })
          setCodigo('')
          setNombreGrupoTurno('')
          setRequest(!request)
        }
      })
      .catch(error => {
        console.log(error)
        toast.error(error.response.data.message || 'Error ', { description: 'Error al crear el área' })
      })
  }

  const confirmDeleteGrupoTurno = () => {
    if (areaToDelete !== null) {
      axios.delete(`${URL_API}/grupo-turno/${areaToDelete}`)
        .then(response => {
          if (response.status === 200) {
            toast.success('El área se eliminó correctamente', { description: 'Área eliminada' });
            setRequest(!request);
          }
        })
        .catch(error => {
          console.log(error);
          toast.error(error.response?.data?.message || 'Error', { description: 'Error al eliminar el Grupo Turno' });
        })
        .finally(() => {
          closeModal();
        });
    }
  };

  const openModal = (id: number) => {
    setAreaToDelete(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAreaToDelete(null);
  };


  return (
    <section className='p-1 flex flex-col h-full'>
      <div className='h-[84vh] overflow-y-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto'>
          <thead className='text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th className='px-4 py-2'>CODIGO</th>
              <th className='px-4 py-2'>grupo turno</th>
              <th className='px-4 py-2'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              turnoGrupo.map(turno => (
                <tr key={turno.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700  '>
                  <td className='px-4 py-2'>{turno.codigo}</td>
                  <td className='px-4 py-2'>{turno.descripcion}</td>
                  <td className='px-4 py-2 flex gap-2'>
                    <button className='bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded-md' onClick={() => openModal(turno.id)}
                    >Eliminar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <section className='m-auto border rounded-md bg-gray-200 py-1'>
        <form className='flex justify-around items-center' onSubmit={handleNewGrupoTurno}>

          <div className='flex items-center'>
            <label className={`text-gray-700 dark:text-gray-400 w-72 text-center `}>
              Código:
            </label>
            <input type='text' value={codigo} onChange={(e) => setCodigo(e.target.value)}
              className='w-full px-2 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' />
          </div>
          <div className='flex items-center'>
            <label className={`text-gray-700 dark:text-gray-400 w-72 text-center `}>
              Nombre Grupo Turno:
            </label>
            <input type='text' value={nombreGrupoTurno} onChange={(e) => setNombreGrupoTurno(e.target.value)}
              className='w-full px-2 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' />
          </div>

          <button type='submit' title='crear grupo turno'
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 mx-4 px-4 rounded h-8`}>
            <PlusIcon />
          </button>

        </form>
      </section>

      {modalIsOpen && <ModalDelete funAction={confirmDeleteGrupoTurno} onCancel={closeModal} />}

    </section>
  );
}