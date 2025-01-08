import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { BottonExporCartera } from '../../components/ExportExcel';
import { Separator } from '../../components/ui/separator';
import { Marcaciones } from '@/types/Marcaciones';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useEffect, useMemo, useState } from 'react';
import { URL_API } from '@/utils/contants';
import { Trash2 } from 'lucide-react';
import axios from 'axios';

function Marcacion() {
  const [marcaciones, setMarcaciones] = useState<Marcaciones[]>([]);
  const [fechaInitial, setFechaInitial] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchdata();
  }, [fechaInitial, fechaFinal]);

  const fetchdata = async () => {
    try {
      const response = await axios.get(`${URL_API}/marcaciones`, { params: { fechaInitial, fechaFinal } });
      setMarcaciones(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const cleanDates = () => {
    setFechaInitial('')
    setFechaFinal('')
  }

  const filterData = useMemo(() => {
    const lowerCaseFilter = filter.toLowerCase();
    return marcaciones.filter((m) => {
      return (
        m.codigo.toLowerCase().includes(lowerCaseFilter) ||
        m.Persona.nombres.toLowerCase().includes(lowerCaseFilter) ||
        m.Persona.apellidos.toLowerCase().includes(lowerCaseFilter) ||
        m.Persona?.Area?.descripcion.toLowerCase().includes(lowerCaseFilter)
      );
    });
  }, [filter, marcaciones]);

  return (
    <section>
      <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-100 text-center pb-1'>
        Listado Marcaciones
      </h1>

      <div className='flex items-center gap-2 px-2 pb-2'>
        <Label className='w-24'>Fecha Inicial:</Label>
        <Input
          className='w-44'
          type='date'
          value={fechaInitial}
          onChange={(e) => setFechaInitial(e.target.value)}
        />
        <Label className='w-24'>Fecha Final:</Label>
        <Input
          className='w-44'
          type='date'
          value={fechaFinal}
          onChange={(e) => setFechaFinal(e.target.value)}
        />

        <Button onClick={cleanDates} title='Limpiar Fechas'>
          <Trash2 />
        </Button>

        <div className='flex items-center gap-1 border p-2 rounded-md'>
          <p>N° Marcaciones:</p>
          <span className='bg-indigo-100 text-indigo-800 font-medium px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300'>
            {filterData.length}
          </span>
        </div>

        <div className='ml-auto'>
          <BottonExporCartera datos={filterData} time1={fechaInitial} time2={fechaFinal} />
        </div>
      </div>

      <div className='flex items-center gap-2 px-2 pb-2'>
        <Label className='w-16'>Filtrar:</Label>
        <Input
          type="text"
          value={filter}
          placeholder='N° Doc | Nombres'
          className='w-96'
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <Separator />

      <div className='h-[78vh] 2xl:h-[82vh] overflow-y-auto relative'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[12px]'>ID</TableHead>
              <TableHead>N° Doc</TableHead>
              <TableHead>Nombres</TableHead>
              <TableHead>Apellidos</TableHead>
              <TableHead>Fecha Marcación</TableHead>
              <TableHead>Hora Marcación</TableHead>
              <TableHead>Estado Marcación</TableHead>
              <TableHead>Área</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterData.map((m) => (
              <TableRow key={m.Id}>
                <TableCell >{m.Id}</TableCell>
                <TableCell >{m.codigo}</TableCell>
                <TableCell >{m.Persona.nombres}</TableCell>
                <TableCell>{m.Persona.apellidos}</TableCell>
                <TableCell>{m.Fecha}</TableCell>
                <TableCell>{m.Hora.slice(0, 5)}</TableCell>
                <TableCell>{m.estado}</TableCell>
                <TableCell>{m.Persona.Area?.descripcion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default Marcacion;