import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Turnos } from '@/types/interfaces';

export function RenderListTurnos({ turnos, openModal, fnEdit, idEdit }: {
  turnos: Turnos[],
  openModal: (id: number) => void,
  fnEdit: (turn: Turnos) => void,
  idEdit: number
}) {
  return (
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
            <TableRow key={turno.id} className={idEdit === turno.id ? 'bg-blue-200' : ''}>
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
                  className='hover:bg-yellow-200'
                  variant={'secondary'}
                  onClick={() => fnEdit(turno)}>
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
  )
}