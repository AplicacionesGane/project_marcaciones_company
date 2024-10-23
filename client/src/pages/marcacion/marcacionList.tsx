import { MarcacionPersonaArea } from '../../types/marcacion';
import { BottonExporCartera } from '../../components/ExportExcel';
import { URL_API } from '../../utils/contants';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MarcacionesList = () => {
  const [marcaciones, setMarcaciones] = useState<MarcacionPersonaArea[]>([]);
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

  const filterData = marcaciones.filter((m) => {
    const lowerCaseFilter = filter.toLowerCase();
    return (
      m.documento.toLowerCase().includes(lowerCaseFilter) ||
      m.nombres.toLowerCase().includes(lowerCaseFilter) ||
      m.apellidos.toLowerCase().includes(lowerCaseFilter) ||
      m.area.toLowerCase().includes(lowerCaseFilter)
    );
  });


  return (
    <section className='bg-white rounded-lg shadow-md'>
      <div className='flex justify-around items-cente'>
        <h1 className='text-gray-700 text-lg font-semibold flex items-center'>Listado de marcaciones</h1>

        <p className='flex items-center'>N° Datos: {filterData.length}</p>

        <div className='flex items-center gap-2 text-xs py-1'>
        <div className='flex items-center gap-1'>
          <label htmlFor="">Filtrar:</label>
          <input type="text" placeholder='N° Doc | Nombres' value={filter} onChange={(e) => setFilter(e.target.value)} className='p-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
        </div>

          <div className='flex items-center gap-2'>
            <label className='w-full'>Fecha Inicial</label>
            <input type='date' value={fechaInitial} onChange={(e) => setFechaInitial(e.target.value)}
              className='p-1 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          </div>

          <div className='flex items-center gap-2'>
            <label className='w-full'>Fecha Final</label>
            <input type='date' value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)}
              className=' p-1 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          </div>

          <button className='px-2 py-2 bg-red-600 rounded-lg font-semibold text-white hover:bg-red-500' onClick={cleanDates}>
            Limpiar Fechas
          </button>
        </div>

        <div className='flex items-center gap-2 '>
          <BottonExporCartera datos={filterData} time1={fechaInitial} time2={fechaFinal} />
        </div>

      </div>

      <table className='w-full'>
        <thead className='bg-blue-200'>
          <tr>
            <th className='px-2 py-1'>ID</th>
            <th className='px-2 py-1'>Documento</th>
            <th className='px-2 py-1'>Nombres</th>
            <th className='px-2 py-1'>Apellidos</th>
            <th className='px-2 py-1'>Fecha Marcación</th>
            <th className='px-2 py-1'>Hora Marcación</th>
            <th className='px-2 py-1'>Estado Marcación</th>
            <th className='px-2 py-1'>Area</th>
          </tr>
        </thead>
        <tbody>
          {filterData?.map((marcacion) => (
            <tr key={marcacion.id}>
              <td className='border px-2 py-1'>{marcacion.id}</td>
              <td className='border px-2 py-1'>{marcacion.documento}</td>
              <td className='border px-2 py-1'>{marcacion.nombres}</td>
              <td className='border px-2 py-1'>{marcacion.apellidos}</td>
              <td className='border px-2 py-1'>{marcacion.fecha.toString()}</td>
              <td className='border px-2 py-1'>{marcacion.hora.toString()}</td>
              <td className='border px-2 py-1'>{marcacion.estado}</td>
              <td className='border px-2 py-1'>{marcacion.area}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </section>
  );
};

export default MarcacionesList;