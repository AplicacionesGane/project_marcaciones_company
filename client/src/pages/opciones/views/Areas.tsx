import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ModalDelete } from '@/components/ModalDelete';
import { FormEvent, useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { type Area } from '@/types/Interfaces';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { URL_API } from '@/utils/contants';
import { toast } from 'sonner';
import axios from 'axios';

export default function Areas() {
  const [areas, setAreas] = useState<Area[]>([]);
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

    axios.post(`${URL_API}/area`, { codigo, descripcion: nombreA })
      .then(response => {
        console.log(response.data)
        if (response.status === 201) {
          toast.success('El área se creo correctamente', { description: 'Área creada' })
          setCodigo('')
          setNombreA('')
          setRequest(true)
        }
      })
      .catch(error => {
        console.log(error)
        toast.error(error.response.data.message || 'Error ', { description: 'Error al crear el área' })
      })
  };

  const handleUpdateArea = (ev: FormEvent) => {
    ev.preventDefault();
    axios.put(`${URL_API}/updatearea`, { id, codigo, nombre: nombreA })
      .then(response => {
        if (response.status === 200) {
          toast.success('El área se actualizó correctamente', { description: 'Área actualizada' })
          setCodigo('')
          setNombreA('')
          setRequest(true)
          setActiveUpdate(false)
        }
      })
      .catch(error => {
        console.log(error)
        toast.error(error.response.data.message || 'Error ', { description: 'Error al actualizar el área' })
      })
  };

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
    setNombreA(descripcion);
    setActiveUpdate(true);
    setCodigo(codigo);
    setId(id);

  };

  const cancelarUpdate = () => {
    setActiveUpdate(false);
    setId(0);
    setCodigo('');
    setNombreA('');
  };

  return (
    <section className='flex flex-col h-screen'>
      <h1 className='text-2xl text-center text-gray-700 dark:text-gray-200 font-semibold mb-1'>
        Gestionar Áreas
      </h1>

      <Separator />

      <section className='h-[80vh] overflow-y-auto'>
        <Table>
          <TableHeader >
            <TableRow>
              <TableHead>
                CODIGO
              </TableHead>
              <TableHead>
                Nombre área
              </TableHead>
              <TableHead>
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              areas.map(area => (
                <TableRow key={area.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700  '>
                  <TableCell className='px-4 py-2'>
                    {area.codigo}
                  </TableCell>
                  <TableCell className='px-4 py-2'>
                    {area.descripcion}
                  </TableCell>
                  <TableCell className='px-4 py-2 flex gap-2'>
                    <Button
                      className='hover:bg-yellow-100'
                      variant={'secondary'}
                      onClick={() => updateArea(area)} >
                      Editar
                    </Button>
                    <Button
                      className='hover:bg-red-200'
                      variant={'secondary'}
                      onClick={() => openModal(area.id)} >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </section>

      <Card className='p-4 m-1 mt-auto'>
        <form className='flex items-center gap-2 w-full'>
          <Label className='min-w-12'>Código:</Label>
          <Input
            type='text'
            value={codigo}
            onChange={ev => setCodigo(ev.target.value)}
            className='w-40'
            placeholder='01, 24, 56 ...'
            required
          />
          <Label className='min-w-24'>Nombre del área:</Label>
          <Input
            type='text'
            value={nombreA}
            onChange={ev => setNombreA(ev.target.value)}
            className='w-72 2xl:w-96'
            placeholder='Administración, Contabilidad, Recursos Humanos ...'
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
                  onClick={handleUpdateArea}
                  className='bg-green-500 hover:bg-green-600'>
                  Actualizar
                </Button>

              </div>
            ) : (
              <div className='flex items-center gap-2 ml-auto'>
                <Button
                  type='submit'
                  onClick={handleNewArea}
                  className='bg-blue-500 hover:bg-blue-600'>
                  Crear Área
                </Button>
              </div>
            )
          }

        </form>
      </Card>

      {modalIsOpen && <ModalDelete funAction={confirmDeleteArea} onCancel={closeModal} />}

    </section>
  );
}