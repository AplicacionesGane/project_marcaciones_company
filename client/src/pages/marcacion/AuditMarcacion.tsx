import { AuditMarcaciones } from '../../types/marcacion';
import { URL_API } from '../../utils/contants';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AuditMarcacion() {
  const [data, setData] = useState<AuditMarcaciones[]>([]);
  const [filter, setFilter] = useState<'A tiempo' | 'Tarde'>('A tiempo');
  const [fecha, setFecha] = useState<string>('');

  useEffect(() => {
    axios.get(`${URL_API}/audit-marcaciones`, { params: { fecha } })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [fecha]);

  const dataFiltered = data.filter(item => item.audit === filter)

  return (
    <section className='p-6 bg-white shadow-md rounded-lg'>

      <div className='flex justify-around'>
        <div className='flex justify-center gap-4 mb-4 items-center'>
          <label htmlFor="">Fecha:</label>
          <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
        </div>

        <div className='flex justify-center gap-4 mb-4 items-center'>
          <h2 className='text-lg font-semibold'>Filtrar Estado:</h2>
          <select name='' id='' onChange={e => setFilter(e.target.value as 'Tarde' | 'A tiempo')}
            className='p-2 border border-gray-200 rounded-lg'>
            <option value=''>Seleccione</option>
            <option value='A tiempo'>A Tiempo</option>
            <option value='Tarde'>Tarde</option>
          </select>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead>
            <tr className='bg-gray-100 border-b'>
              <th className='py-2 px-4 text-left text-sm font-medium text-gray-600'>Nombres</th>
              <th className='py-2 px-4 text-left text-sm font-medium text-gray-600'>Apellidos</th>
              <th className='py-2 px-4 text-left text-sm font-medium text-gray-600'>Hora Marcación</th>
              <th className='py-2 px-4 text-left text-sm font-medium text-gray-600'>Estado Marcación</th>
              <th className='py-2 px-4 text-left text-sm font-medium text-gray-600'>Hora Estimada</th>
              <th className='py-2 px-4 text-left text-sm font-medium text-gray-600'>Audit</th>
            </tr>
          </thead>
          <tbody>
            {dataFiltered.map((item, index) => (
              <tr key={index} className='border-b hover:bg-gray-50'>
                <td className='py-2 px-4 text-sm text-gray-700'>{item.nombres}</td>
                <td className='py-2 px-4 text-sm text-gray-700'>{item.apellidos}</td>
                <td className='py-2 px-4 text-sm text-gray-700'>{item.horaMarcacion}</td>
                <td className='py-2 px-4 text-sm text-gray-700'>{item.estado}</td>
                <td className='py-2 px-4 text-sm text-gray-700'>{item.horaEstimada}</td>
                <td className='py-2 px-4 text-sm text-gray-700'>
                  {
                    item.audit === 'Tarde' || item.audit === 'Temprano'
                      ? (<span className='text-red-500 font-semibold'>Tarde</span>)
                      : (<span className='text-green-500 font-semibold'>A tiempo</span>)
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className='text-sm pt-2'>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">NOTA</span>
        Las estimaciones de cálculo de esta vista de auditoría están en fase beta. El aplicativo realiza en el backend la respectiva comparación entre la hora de marcación y la hora estimada, dependiendo del tipo de marcación <span className='font-semibold'>(Estado).</span> Es importante que el empleado tenga asignado un Grupo Turno, donde cada grupo contiene una cantidad específica de turnos entre la semana, de lunes a domingo. Para el correcto funcionamiento, por el momento, solo se debe tener un turno por día.
      </p>
    </section>
  )
}