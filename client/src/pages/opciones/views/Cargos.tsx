import { CloseIcon } from '../../../components/icons/CloseIcon';
import { EditIcon } from '../../../components/icons/EditIcon';
import { PlusIcon } from '../../../components/icons/PlusIcon';
import { ModalDelete } from '../../../components/ModalDelete';
import { FormEvent, useEffect, useState } from 'react';
import { URL_API } from '../../../utils/contants';
import { Cargo } from '../../../types/Interfaces';
import { toast } from 'sonner';
import axios from 'axios';

export default function Cargos() {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [activeNewCargo, setActiveNewCargo] = useState<boolean>(false);
  const [cargoDelete, setCargoDelete] = useState<number | null>(null);
  const [activeUpdate, setActiveUpdate] = useState<boolean>(false);

  const [request, setRequest] = useState<boolean>(false);

  const [id, setId] = useState<number>(0);
  const [codigo, setCodigo] = useState<string>('');
  const [nombreCargo, setNombreCargo] = useState<string>('');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get(`${URL_API}/cargos`)
      .then(response => {
        setCargos(response.data)
        setRequest(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [request]);

  const handleNewCargo = (e: FormEvent) => {
    e.preventDefault();

    axios.post(`${URL_API}/cargo`, { codigo, nombre: nombreCargo })
      .then(response => {
        console.log(response.data)
        if (response.status === 201) {
          toast.success('El cargo se creo correctamente', { description: 'cargo creada' })
          setCodigo('')
          setNombreCargo('')
          setActiveNewCargo(false)
          setRequest(true)
        }
      })
      .catch(error => {
        console.log(error)
        toast.error(error.response.data.message || 'Error ', { description: 'Error al crear el cargo' })
      })
  }

  const handleUpdateCargo = (ev: FormEvent) => {
    ev.preventDefault();
    axios.put(`${URL_API}/updatecargo`, { id, codigo, nombre: nombreCargo })
      .then(response => {
        if (response.status === 200) {
          toast.success('El área se actualizó correctamente', { description: 'Área actualizada' })
          setCodigo('')
          setNombreCargo('')
          setActiveNewCargo(false)
          setRequest(true)
        }
      })
      .catch(error => {
        console.log(error)
        toast.error(error.response.data.message || 'Error ', { description: 'Error al actualizar el área' })
      })
  }

  const confirmDeletecargo = () => {
    if (cargoDelete !== null) {
      axios.delete(`${URL_API}/cargo/${cargoDelete}`)
        .then(response => {
          if (response.status === 200) {
            toast.success('El cargo se eliminó correctamente', { description: 'cargo eliminada' });
            setRequest(true);
          }
        })
        .catch(error => {
          console.log(error);
          toast.error(error.response?.data?.message || 'Error', { description: 'Error al eliminar el cargo' });
        })
        .finally(() => {
          closeModal();
        });
    }
  };

  const openModal = (id: number) => {
    setCargoDelete(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCargoDelete(null);
  };

  const updateCargo = (cargo: Cargo) => {
    const { ID, codigo, descripcion } = cargo;
    setActiveUpdate(true);
    setActiveNewCargo(true);
    setId(ID);
    setCodigo(codigo);
    setNombreCargo(descripcion);

  }

  const cancelarUpdate = () => {
    setActiveUpdate(false);
    setActiveNewCargo(false);
    setId(0);
    setCodigo('');
    setNombreCargo('');
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
                Nombre Cargo
              </th>
              <th scope='col' className='px-4 py-2'>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
              cargos.map(cargo => (
                <tr key={cargo.ID} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700  '>
                  <td className='px-4 py-2'>
                    {cargo.codigo}
                  </td>
                  <td className='px-4 py-2'>
                    {cargo.descripcion}
                  </td>
                  <td className='px-4 py-2 flex gap-2'>
                    <button className='bg-yellow-300 hover:bg-yellow-400 text-black px-2 py-1 rounded-md' onClick={() => updateCargo(cargo)}
                    >Editar</button>
                    <button className='bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded-md' onClick={() => openModal(cargo.ID)}
                    >Eliminar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>


      <section className='bg-gray-200 flex items-center py-2 rounded-md' onSubmit={ev => activeUpdate ? handleUpdateCargo(ev) : handleNewCargo(ev)}>
        <form className='flex justify-end items-center relative'>
          <div className={`flex items-center mb-4 absolute left-4 top-2 ${activeNewCargo ? 'hidden' : ''}`}>
            <input checked={activeNewCargo} type='checkbox' value='' onChange={() => setActiveNewCargo(!activeNewCargo)} className='h-5 w-5 text-blue-600 border rounded-md mr-2' />
            <label>Nuevo cargo</label>
          </div>
          <div className='flex items-center'>
            <label className={`${!activeNewCargo ? 'hidden' : 'block'} text-gray-700 dark:text-gray-400 w-72 text-center `}>
              Código:
            </label>
            <input type='text' disabled={!activeNewCargo} value={codigo} onChange={(e) => setCodigo(e.target.value)}
              className='w-full px-4 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' />
          </div>
          <div className='flex items-center'>
            <label className={`${!activeNewCargo ? 'hidden' : 'block'} text-gray-700 dark:text-gray-400 w-72 text-center `}>
              Nombre del cargo:
            </label>
            <input type='text' disabled={!activeNewCargo} value={nombreCargo} onChange={(e) => setNombreCargo(e.target.value)}
              className='w-full px-4 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' />
          </div>
          {
            activeUpdate ? (
              <>
                <button type='submit' title='cancelar edicion' onClick={() => cancelarUpdate()}
                  className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 mx-4 px-4 rounded h-8 ${!activeNewCargo ? 'hidden' : 'block'}`}>
                  <CloseIcon />
                </button>
                <button type='submit' title='editar cargos'
                  className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 mx-4 px-4 rounded h-8 ${!activeNewCargo ? 'hidden' : 'block'}`}>
                  <EditIcon />
                </button>
              </>
            ) : (
              <button type='submit' title='crear cargos'
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 mx-4 px-4 rounded h-8 ${!activeNewCargo ? 'hidden' : 'block'}`}>
                <PlusIcon />
              </button>
            )
          }
        </form>
      </section>

      {modalIsOpen && <ModalDelete funAction={confirmDeletecargo} onCancel={closeModal} />}

    </section>
  );
}