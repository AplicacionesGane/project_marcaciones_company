import { RenderListTurnos } from '@/components/RenderListTurnos';
import { FormEvent, useEffect, useState } from 'react';
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
  const { toast } = useToast();

  const [newTurno, setNewTurno] = useState<Turnos>({
    id: 0,
    codigo: '',
    descripcion: '',
    hora_inicio: '',
    hora_fin: '',
    teorico: '',
    hora_inicio_break: '',
    hora_fin_break: '',
    tiempo_breack: '',
    conceptos: ''
  })

  useEffect(() => {
    axios.get(`${URL_API}/turnos`)
      .then(response => setturnos(response.data))
      .catch(error => console.log(error))
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(newTurno);

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
        <RenderListTurnos turnos={turnos} openModal={openModal} />
      </section>

      <Card className='p-4'>
        <form
          className='grid grid-cols-6 place-content-center place-items-center gap-2'
          onSubmit={ev => handleSubmit(ev)}
        >
          <Label>Codigo</Label>
          <Input
            value={newTurno.codigo}
            onChange={ev => setNewTurno({ ...newTurno, codigo: ev.target.value })}
            type='text'
            name='codigo'
            id='codigo'
            required
          />
          <Label>Nombre Turno</Label>
          <Input
            value={newTurno.descripcion}
            onChange={ev => setNewTurno({ ...newTurno, descripcion: ev.target.value })}
            type='text'
            name='nombre_turno'
            id='nombre_turno'
            required
          />
          <Label>Hora Inicio turno</Label>
          <Input
            value={newTurno.hora_inicio}
            onChange={ev => setNewTurno({ ...newTurno, hora_inicio: ev.target.value })}
            type='time'
            name='hora_inicio'
            id='hora_inicio'
            required
          />
          <Label>Hora Fin turno</Label>
          <Input
            value={newTurno.hora_fin}
            onChange={ev => setNewTurno({ ...newTurno, hora_fin: ev.target.value })}
            type='time'
            name='hora_fin'
            id='hora_fin'
            required
          />
          <Label>Horas Total Día</Label>
          <Input
            value={newTurno.teorico}
            onChange={ev => setNewTurno({ ...newTurno, teorico: ev.target.value })}
            type='text'
            name='teorico'
            id='teorico'
            required
          />
          <Label>Hora Inicio Break</Label>
          <Input
            value={newTurno.hora_inicio_break}
            onChange={ev => setNewTurno({ ...newTurno, hora_inicio_break: ev.target.value })}
            type='time'
            name='hora_inicio_break'
            id='hora_inicio_break'
          />
          <Label>Hora Final Break</Label>
          <Input
            value={newTurno.hora_fin_break}
            onChange={ev => setNewTurno({ ...newTurno, hora_fin_break: ev.target.value })}
            type='time'
            name='hora_fin_break'
            id='hora_fin_break'
          />
          <Label>Tiempo Break</Label>
          <Input
            value={newTurno.tiempo_breack}
            onChange={ev => setNewTurno({ ...newTurno, tiempo_breack: ev.target.value })}
            type='text'
            name='tiempo_breack'
            id='tiempo_breack'
          />

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