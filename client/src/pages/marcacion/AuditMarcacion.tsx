import { AuditMarcaciones } from '../../types/marcacion';
import { URL_API } from '../../utils/contants';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AuditMarcacion() {
  const [data, setData] = useState<AuditMarcaciones[]>([]);

  const FechaHoy = new Date().toLocaleDateString();

  useEffect(() => {
    axios.get(`${URL_API}/audit-marcacion`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <section className='p-6 bg-white shadow-md rounded-lg'>
      <h1 className='text-2xl font-semibold mb-4 text-center'>Lista de Marcaciones {FechaHoy} </h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead>
            <tr className='bg-gray-100 border-b'>
              <th className='py-2 px-4 text-left text-sm font-medium text-gray-600'>Nombres</th>
              <th className='py-2 px-4 text-left text-sm font-medium text-gray-600'>Apellidos</th>
              <th className='py-2 px-4 text-left text-sm font-medium text-gray-600'>Hora Marcación</th>
              <th className='py-2 px-4 text-left text-sm font-medium text-gray-600'>Estado Marcación</th>
              <th className='py-2 px-4 text-left text-sm font-medium text-gray-600'>Hora Inicio</th>
              <th className='py-2 px-4 text-left text-sm font-medium text-gray-600'>Audit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className='border-b hover:bg-gray-50'>
                <td className='py-2 px-4 text-sm text-gray-700'>{item.nombres}</td>
                <td className='py-2 px-4 text-sm text-gray-700'>{item.apellidos}</td>
                <td className='py-2 px-4 text-sm text-gray-700'>{item.hora}</td>
                <td className='py-2 px-4 text-sm text-gray-700'>{item.estado}</td>
                <td className='py-2 px-4 text-sm text-gray-700'>{item.hora_inicio}</td>
                <td className='py-2 px-4 text-sm text-gray-700'>
                  {
                    item.estado === 'Entrada' && item.hora > item.hora_inicio
                      ? (<span className='text-red-500 font-semibold'>Tarde</span>)
                      : (<span className='text-green-500 font-semibold'>A tiempo</span>)
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}