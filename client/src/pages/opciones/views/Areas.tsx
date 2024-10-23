import { CloseIcon } from '../../../components/icons/CloseIcon';
import { PlusIcon } from '../../../components/icons/PlusIcon';
import { EditIcon } from '../../../components/icons/EditIcon';
import { ModalDelete } from '../../../components/ModalDelete';
import { FormEvent, useEffect, useState } from 'react';
import { type Area } from '../../../types/Interfaces';
import { URL_API } from '../../../utils/contants';
import { toast } from 'sonner';
import axios from 'axios';

export default function Areas() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [activeNewArea, setActiveNewArea] = useState<boolean>(false);
  const [areaToDelete, setAreaToDelete] = useState<number | null>(null);
  const [activeUpdate, setActiveUpdate] = useState<boolean>(false);

  const [id, setId] = useState<number>(0);
  const [codigo, setCodigo] = useState<string>('');
  const [nombreA, setNombreA] = useState<string>('');

  const [request, setRequest] = useState<boolean>(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get(`${URL_API}/areas`)
      .then(response => {
        setAreas(response.data)
        setRequest(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [request]);

  const handleNewArea = (e: FormEvent) => {
    e.preventDefault();

    axios.post(`${URL_API}/area`, { codigo, nombre: nombreA })
      .then(response => {
        console.log(response.data)
        if (response.status === 201) {
          toast.success('El área se creo correctamente', { description: 'Área creada' })
          setCodigo('')
          setNombreA('')
          setActiveNewArea(false)
          setRequest(true)
        }
      })
      .catch(error => {
        console.log(error)
        toast.error(error.response.data.message || 'Error ', { description: 'Error al crear el área' })
      })
  }

  const handleUpdateArea = (ev: FormEvent) => {
    ev.preventDefault();
    axios.put(`${URL_API}/updatearea`, { id, codigo, nombre: nombreA })
      .then(response => {
        if (response.status === 200) {
          toast.success('El área se actualizó correctamente', { description: 'Área actualizada' })
          setCodigo('')
          setNombreA('')
          setActiveNewArea(false)
          setRequest(true)
        }
      })
      .catch(error => {
        console.log(error)
        toast.error(error.response.data.message || 'Error ', { description: 'Error al actualizar el área' })
      })
  }

  const confirmDeleteArea = () => {
    if (areaToDelete !== null) {
      axios.delete(`${URL_API}/area/${areaToDelete}`)
        .then(response => {
          if (response.status === 200) {
            toast.success('El área se eliminó correctamente', { description: 'Área eliminada' });
            setRequest(true);
          }
        })
        .catch(error => {
          console.log(error);
          toast.error(error.response?.data?.message || 'Error', { description: 'Error al eliminar el área' });
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

  const updateArea = (area: Area) => {
    const { id, codigo, descripcion } = area;
    setActiveUpdate(true);
    setActiveNewArea(true);
    setId(id);
    setCodigo(codigo);
    setNombreA(descripcion);

  }

  const cancelarUpdate = () => {
    setActiveUpdate(false);
    setActiveNewArea(false);
    setId(0);
    setCodigo('');
    setNombreA('');
  }


  return (
    <section className='p-1 flex flex-col'>

      <div className='h-[83vh] overflow-y-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-4 py-2'>
                CODIGO
              </th>
              <th scope='col' className='px-4 py-2'>
                Nombre área
              </th>
              <th scope='col' className='px-4 py-2'>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
              areas.map(area => (
                <tr key={area.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700  '>
                  <td className='px-4 py-2'>
                    {area.codigo}
                  </td>
                  <td className='px-4 py-2'>
                    {area.descripcion}
                  </td>
                  <td className='px-4 py-2 flex gap-2'>
                    <button className='bg-yellow-300 hover:bg-yellow-400 text-black px-2 py-1 rounded-md' onClick={() => updateArea(area)}>Editar</button>
                    <button className='bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded-md' onClick={() => openModal(area.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <section className='bg-gray-200 flex items-center py-2 rounded-md'>
        <form className='flex justify-end items-center relative' onSubmit={ev => activeUpdate ? handleUpdateArea(ev) : handleNewArea(ev)}>
          <div className={`flex items-center mb-4 absolute left-4 top-2 ${activeNewArea ? 'hidden' : ''}`}>
            <input checked={activeNewArea} type='checkbox' value='' onChange={() => setActiveNewArea(!activeNewArea)} className='h-5 w-5 text-blue-600 border rounded-md mr-2' />
            <label>Nueva área</label>
          </div>
          <div className='flex items-center'>
            <label className={`${!activeNewArea ? 'hidden' : 'block'} text-gray-700 dark:text-gray-400 w-72 text-center `}>
              Código:
            </label>
            <input type='text' disabled={!activeNewArea} value={codigo} onChange={(e) => setCodigo(e.target.value)}
              className='w-full px-4 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' />
          </div>
          <div className='flex items-center'>
            <label className={`${!activeNewArea ? 'hidden' : 'block'} text-gray-700 dark:text-gray-400 w-72 text-center `}>
              Nombre del área:
            </label>
            <input type='text' disabled={!activeNewArea} value={nombreA} onChange={(e) => setNombreA(e.target.value)}
              className='w-full px-4 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' />
          </div>
          {
            activeUpdate ? (
              <>
                <button type='submit' title='cancelar edicion' onClick={() => cancelarUpdate()}
                  className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 mx-4 px-4 rounded h-8 ${!activeNewArea ? 'hidden' : 'block'}`}>
                  <CloseIcon />
                </button>
                <button type='submit' title='editar área'
                  className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 mx-4 px-4 rounded h-8 ${!activeNewArea ? 'hidden' : 'block'}`}>
                  <EditIcon />
                </button>
              </>
            ) : (
              <button type='submit' title='crear área'
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 mx-4 px-4 rounded h-8 ${!activeNewArea ? 'hidden' : 'block'}`}>
                <PlusIcon />
              </button>
            )
          }
        </form>
      </section>

      {modalIsOpen && <ModalDelete funAction={confirmDeleteArea} onCancel={closeModal} />}

    </section>
  );
}