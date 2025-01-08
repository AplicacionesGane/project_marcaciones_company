import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { FormEvent, useEffect, useState } from 'react';
import { ModalDelete } from '../../../components/ModalDelete';
import { Separator } from '../../../components/ui/separator';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Card } from '../../../components/ui/card';
import { URL_API } from '@/utils/contants';
import { Cargo } from '@/types/Interfaces';
import { toast } from 'sonner';
import axios from 'axios';

function Cargos() {
  const [cargos, setCargos] = useState<Cargo[]>([]);
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

    axios.post(`${URL_API}/cargo`, { codigo, descripcion: nombreCargo })
      .then(response => {
        console.log(response.data)
        if (response.status === 201) {
          toast.success('El cargo se creo correctamente', { description: 'cargo creada' })
          setCodigo('')
          setNombreCargo('')
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
          setRequest(true)
          setActiveUpdate(false)
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
    setId(ID);
    setCodigo(codigo);
    setNombreCargo(descripcion);
  }

  const cancelarUpdate = () => {
    setActiveUpdate(false);
    setId(0);
    setCodigo('');
    setNombreCargo('');
  }

  return (
    <section className='flex flex-col h-screen'>

      <h1 className='text-2xl text-center text-gray-700 dark:text-gray-200 font-semibold mb-1'>
        Gestionar Cargos
      </h1>

      <Separator />

      <div className='h-[80vh] overflow-y-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                CODIGO
              </TableHead>
              <TableHead>
                Nombre Cargo
              </TableHead>
              <TableHead>
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              cargos.map(cargo => (
                <TableRow key={cargo.ID}>
                  <TableCell className='px-4 py-2'>
                    {cargo.codigo}
                  </TableCell>
                  <TableCell className='px-4 py-2'>
                    {cargo.descripcion}
                  </TableCell>
                  <TableCell className='px-4 py-2 flex gap-2'>
                    <Button
                      className='hover:bg-yellow-100'
                      variant={'secondary'}
                      onClick={() => updateCargo(cargo)}>
                      Editar</Button>
                    <Button
                      className='hover:bg-red-200'
                      variant={'secondary'}
                      onClick={() => openModal(cargo.ID)}>
                      Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>


      <Card className='p-4 m-1 mt-auto'>
        <form className='flex items-center gap-2 w-full'>
          <Label className='min-w-12'>Código</Label>
          <Input
            type='text'
            className='w-40'
            placeholder='01, 12, 35 ...'
            value={codigo}
            onChange={e => setCodigo(e.target.value)}
            required
          />
          <Label className='min-w-24'>Nombre Cargo</Label>
          <Input
            type='text'
            className='w-72 2xl:w-96'
            placeholder='Técnico, Analista, Asistente, Jefe ...'
            value={nombreCargo}
            onChange={e => setNombreCargo(e.target.value)}
            required
          />
          {
            activeUpdate ? (
              <div className='flex items-center gap-2 ml-auto'>
                <Button
                  onClick={() => cancelarUpdate()}
                  className='bg-red-500 hover:bg-red-600'>
                  Cancelar
                </Button>

                <Button
                  type='submit'
                  onClick={handleUpdateCargo}
                  className='bg-green-500 hover:bg-green-600'>
                  Actualizar
                </Button>

              </div>
            ) : (
              <div className='flex items-center gap-2 ml-auto'>
                <Button
                  type='submit'
                  onClick={handleNewCargo}
                  className='bg-blue-500 hover:bg-blue-600'>
                  Crear Área
                </Button>
              </div>
            )
          }
        </form>
      </Card>

      {modalIsOpen && <ModalDelete funAction={confirmDeletecargo} onCancel={closeModal} />}

    </section >
  );
}

export default Cargos;