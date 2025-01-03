import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ModalDelete } from '@/components/ModalDelete';
import { FormEvent, useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { GrupoTurnos } from '@/types/Interfaces';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { URL_API } from '@/utils/contants';
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
    <section className='p-1 flex flex-col h-screen'>
      <h1 className='text-2xl text-center text-gray-700 dark:text-gray-200 font-semibold mb-1'>
        Gestionar Grupos Turnos
      </h1>

      <Separator />

      <div className='h-[80vh] overflow-y-auto'>
        <Table >
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Grupo Turno</TableHead>
              <TableHead>Opciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              turnoGrupo.map(turno => (
                <TableRow key={turno.id} >
                  <TableCell>{turno.codigo}</TableCell>
                  <TableCell>{turno.descripcion}</TableCell>
                  <TableCell>
                    <Button
                      variant={'secondary'}
                      className=' hover:bg-red-200'
                      onClick={() => openModal(turno.id)}
                    >
                      Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>

      <Card className='p-4'>
        <form
          className='flex items-center gap-2 w-full'
          onSubmit={handleNewGrupoTurno}
        >
          <Label className='min-w-12'>Código:</Label>
          <Input
            type='text'
            className='w-28'
            placeholder='01, 12, 35 ...'
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />

          <Label className='min-w-36'>Nombre Grupo Turno:</Label>
          <Input
            type='text'
            className='w-80'
            placeholder='Informatica, Administracion, Cartera ...'
            value={nombreGrupoTurno}
            onChange={(e) => setNombreGrupoTurno(e.target.value)}
          />
          <div className='flex items-center gap-2 ml-auto'>
            <Button
              type='submit'
              title='crear grupo turno'
              variant={'secondary'}
              className='hover:bg-green-200'
            >
              Crear Grupo Turno
            </Button>
          </div>

        </form>
      </Card>

      {modalIsOpen && <ModalDelete funAction={confirmDeleteGrupoTurno} onCancel={closeModal} />}

    </section >
  );
}