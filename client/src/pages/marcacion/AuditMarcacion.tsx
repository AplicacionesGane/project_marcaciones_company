import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Separator } from '@/components/ui/separator';
import { AuditMarcaciones } from '@/types/marcacion';
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { FormEvent, useState } from 'react';
import { URL_API } from '@/utils/contants';
import { InfoIcon } from "lucide-react";
import axios from 'axios';

export default function AuditMarcacion() {
  const [data, setData] = useState<AuditMarcaciones[]>([]);
  const [estado, setEstado] = useState<string>('');
  const [fecha, setFecha] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    axios.post(`${URL_API}/audit-marcacion`, { fecha, estado })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <section className='flex flex-col h-screen'>

      <h1 className='text-2xl text-center text-gray-700 dark:text-gray-200 font-semibold mb-1'>
        Auditar Marcaciones
      </h1>

      <Separator />

      <Card className='p-4 flex'>
        <form className="flex items-center space-x-4" onSubmit={handleSubmit}>
          <Label>Fecha:</Label>
          <Input
            type='date'
            className='w-36'
            value={fecha}
            onChange={e => setFecha(e.target.value)}
          />
          <Label>Marcación:</Label>
          <Select onValueChange={val => setEstado(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccione Marcación" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Entrada">Entrada</SelectItem>
                <SelectItem value="Salida">Salida</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button>
            Buscar Marcaciones
          </Button>
        </form>

        <Dialog>
          <DialogTrigger asChild className="ml-auto">
            <Button variant="outline">
              <InfoIcon size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Auditoría Marcaciones</DialogTitle>
              <DialogDescription>
                <span>
                  Con esta opción se podrán auditar las marcaciones de los empleados. No obstante se deben tener en cuenta los siguientes consideraciones:
                </span>
                <ul className='list-disc pl-4 py-4 space-y-2'>
                  <li>La marcación de <strong>Entrada</strong> se considerará <strong>tarde</strong> si la hora de marcación es mayor a la hora de inicio.</li>
                  <li>La marcación de <strong>Salida</strong> se considerará <strong>a tiempo</strong> si la hora de marcación es mayor ó igual a la hora de fin del turno.</li>
                  <li>
                    Si el empleado realiza el mismo tipo de marcaciones en un mismo día, este realizará el cálculo para todas las marcaciones realizadas en ese día.
                  </li>
                  <li>
                    Se debe tener en cuenta que estos cálculos se realizarán siempre y cuando:
                    <br />
                    - El empleado tenga asignados nombres y apellidos <br />
                    - El estado empleado esté activo <br />
                    - El empleado tenga asignado un Grupo, el cual continene los horarios de los diferentes días de la semana<br />
                  </li>
                  <li>
                    La realización de una correcta marcación por parte del empleado mejorará la veraicidad de los cálculos realizados.
                  </li>
                </ul>

              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cerrar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>

      <div className='h-[80vh] overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombres</TableHead>
              <TableHead>Apellidos</TableHead>
              <TableHead>Hora Asignada</TableHead>
              <TableHead>Hora Marcación</TableHead>
              <TableHead>Estado Marcación</TableHead>
              <TableHead>Audit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.nombres}</TableCell>
                <TableCell>{item.apellidos}</TableCell>
                <TableCell>
                  {
                    estado === 'Entrada' ? item.hora_inicio : item.hora_fin
                  }
                </TableCell>
                <TableCell>{item.hora}</TableCell>
                <TableCell>{item.estado}</TableCell>
                <TableCell>
                  {
                    estado === 'Entrada' ? (
                      item.estado === 'Entrada' && item.hora > item.hora_inicio
                        ? (<span className='text-red-500 font-semibold'>Tarde</span>)
                        : (<span className='text-green-500 font-semibold'>A tiempo</span>)
                    ) : (
                      item.estado === 'Salida' && item.hora >= item.hora_fin
                        ? (<span className='text-green-500 font-semibold'>A tiempo</span>)
                        : (<span className='text-red-500 font-semibold'>Anticipado</span>)
                    )
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <footer className='flex justify-center items-center p-4 bg-gray-100 dark:bg-gray-800 mt-auto'>
        <span className='text-sm text-gray-600 dark:text-gray-300'>
          Esta funcionalidad está en fase beta mientras se realizan pruebas exhaustivas en todos los tipos de marcaciones y sus respectivos cálculos.
        </span>
      </footer>
    </section>
  )
}