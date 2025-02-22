import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { ModalDelete } from '@/components/modal-delete';
import { Separator } from '@/components/ui/separator';
import { type Turnos } from '@/types/interfaces';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { URL_API } from '@/utils/constants';
import axios from 'axios';

function Turnos() {
  const [turnoDelete, setTurnoDelete] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [turnos, setturnos] = useState<Turnos[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    axios.get(`${URL_API}/turnos`)
      .then(response => setturnos(response.data))
      .catch(error => console.log(error))
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    /*
    axios.post(`${URL_API}/turno`, turno)
      .then(response => {
        if (response.status === 201) {
          toast({ title: 'El turno se creó correctamente', description: 'Turno creado' });
          setRequest(true);
          formRef.current?.reset();
        }
      })
      .catch(error => {
        console.log(error);
        toast({ title: error.response?.data?.message || 'Error', description: 'Error al crear el turno' });
      })
      */
  }

  const confirmDeleteTurno = () => {
    if (turnoDelete !== null) {
      axios.delete(`${URL_API}/turno/${turnoDelete}`)
        .then(response => {
          if (response.status === 200) {
            toast({ title: 'El cargo se eliminó correctamente', description: 'turno eliminado' });
          }
        })
        .catch(error => {
          console.log(error);
          toast({ title: error.response?.data?.message || 'Error', description: 'Error al eliminar el turno' });
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
    <section className='p-1 flex flex-col h-screen'>

      <h1 className='text-2xl text-center text-gray-700 dark:text-gray-200 font-semibold mb-1'>
        Gestionar Horarios Laborales
      </h1>

      <Separator />

      <section className='h-[80vh] overflow-y-auto'>

        <Table>
          <TableHeader >
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre turno</TableHead>
              <TableHead>Horas Total Día</TableHead>
              <TableHead>Hora Inicio</TableHead>
              <TableHead>Hora Fin</TableHead>
              <TableHead>Hora Inicio Break</TableHead>
              <TableHead>Hora Final Break</TableHead>
              <TableHead>Tiempo Breack</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              turnos.map(turno => (
                <TableRow key={turno.id} >
                  <TableCell>{turno.codigo}</TableCell>
                  <TableCell>{turno.descripcion}</TableCell>
                  <TableCell>{turno.teorico.split(':', 1)} h</TableCell>
                  <TableCell>{turno.hora_inicio}</TableCell>
                  <TableCell>{turno.hora_fin}</TableCell>
                  <TableCell>{turno.hora_inicio_break}</TableCell>
                  <TableCell>{turno.hora_fin_break}</TableCell>
                  <TableCell>{turno.tiempo_breack}</TableCell>
                  <TableCell>
                    <Button
                      className='hover:bg-green-200'
                      variant={'secondary'}
                      onClick={() => console.log('editar')}>
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      className='hover:bg-red-200'
                      variant={'secondary'}
                      onClick={() => openModal(turno.id)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </section>

      <Card className='p-4'>
        <form
          ref={formRef}
          onSubmit={ev => handleSubmit(ev)}
          className='grid grid-cols-6 place-content-center place-items-center gap-2'
        >
          <Label>Codigo</Label>
          <Input type='text' name='codigo' id='codigo' required />
          <Label>Nombre Turno</Label>
          <Input type='text' name='nombre_turno' id='nombre_turno' required />
          <Label>Hora Inicio turno</Label>
          <Input type='time' name='hora_inicio' id='hora_inicio' required />
          <Label>Hora Fin turno</Label>
          <Input type='time' name='hora_fin' id='hora_fin' required />
          <Label>Horas Total Día</Label>
          <Input type='text' name='teorico' id='teorico' required />
          <Label>Hora Inicio Break</Label>
          <Input type='time' name='hora_inicio_break' id='hora_inicio_break' />
          <Label>Hora Final Break</Label>
          <Input type='time' name='hora_fin_break' id='hora_fin_break' />
          <Label>Tiempo Break</Label>
          <Input type='text' name='tiempo_breack' id='tiempo_breack' />

          <Button
            type='submit'>
            Crear Turno
          </Button>
        </form>
      </Card>

      {modalIsOpen && <ModalDelete funAction={confirmDeleteTurno} onCancel={closeModal} />}

    </section >
  );
}

export default Turnos;