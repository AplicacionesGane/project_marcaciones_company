import { ResponsePersona, PersonaFields } from '../../types/Persona';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, ChangeEvent } from 'react';
import { URL_API } from '../../utils/contants';
import { toast } from 'sonner';
import axios from 'axios';

export default function InfoPersona() {
  const { id } = useParams();
  const [persona, setPersona] = useState<PersonaFields>({
    id: 0,
    identificacion: '',
    nombres: '',
    apellidos: '',
    id_Areas: 0,
    id_Cargo: 0,
    id_Grupo_Horario: 0
  });
  const [data, setData] = useState<ResponsePersona | null>(null);
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios.get(`${URL_API}/persona/${id}`)
      .then(response => {
        if (response.status === 200) {
          setData(response.data)
          if (response.data.persona) {
            setPersona(response.data.persona)
          }
        }
      }
      )
      .catch(error => console.log(error));
  }, [id, reload]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersona(prev => ({ ...prev, [name]: value }));
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersona(prev => ({ ...prev, [name]: parseInt(value) }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fields = { ...persona };

    axios.patch(`${URL_API}/persona`, { fields, id })
      .then(response => {
        if (response.status === 200) {
          toast.success('Datos actualizados correctamente', { description: 'Los datos del empleado han sido actualizados' });
          setTimeout(() => {
            setReload(!reload);
          }, 3000);
        }
      })
      .catch(error => {
        console.log(error);
        toast.error('Error al actualizar datos', { description: 'Ocurrió un error al intentar actualizar los datos del empleado' });
      });
  }

  return (
    <section className='p-12 h-[90vh]'>

      <form className='flex' onSubmit={handleSubmit}>
        <section className='max-w-md mx-auto'>
          <h2 className='pb-6 text-center font-semibold text-2xl'>Datos Básicos Empleado</h2>
          <div className='relative z-0 w-full mb-5 group'>
            <input type='text' name='nombres' value={persona.nombres} id='nombres' onChange={ev => handleInputChange(ev)}
              className='block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' placeholder=' ' required />
            <label htmlFor='nombres' className='peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Nombres</label>
          </div>
          <div className='relative z-0 w-full mb-5 group'>
            <input type='text' name='apellidos' value={persona.apellidos} id='apellidos' onChange={ev => handleInputChange(ev)}
              className='block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' placeholder=' ' required />
            <label htmlFor='apellidos' className='peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Apellidos</label>
          </div>
          <div className='grid md:grid-cols-2 md:gap-6'>
            <div className='relative z-0 w-full mb-5 group'>
              <input type='text' value={persona.identificacion} readOnly id='identificacion'
                className='block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 border-blue-600 peer' placeholder=' ' required />
              <label className='peer-focus:font-medium absolute text-xl dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Identificación</label>
            </div>
          </div>

 
        </section>
        <section className='w-96 mx-auto'>
          <div className='w-full mb-5 group'>
            <label htmlFor='id_Areas' className='block mb-2 text-xl font-medium text-gray-900 dark:text-white'>Área del empleado</label>
            <select id='id_Areas' name='id_Areas' value={persona.id_Areas || 0} onChange={ev => handleSelectChange(ev)}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              <option value={0} disabled >Seleccione Área</option>
              {
                data?.options.Areas.map(area => (
                  <option key={area.id} value={area.id}>
                    {area.descripcion}
                  </option>
                ))
              }
            </select>
          </div>
          <div className='w-full mb-5 group'>
            <label htmlFor='id_Cargo' className='block mb-2 text-xl font-medium text-gray-900 dark:text-white'>Cargo del empleado</label>
            <select id='id_Cargo' name='id_Cargo' value={persona.id_Cargo || 0} onChange={ev => handleSelectChange(ev)}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              <option value={0} disabled >Seleccione Cargo</option>
              {
                data?.options.Cargos.map(cargo => (
                  <option key={cargo.ID} value={cargo.ID}>
                    {cargo.descripcion}
                  </option>
                ))
              }
            </select>
          </div>
          <div className='w-full mb-5 group'>
            <label className='block mb-2 text-xl font-medium text-gray-900 dark:text-white'>Grupo Horario del empleado</label>
            <select id='id_Grupo_Horario' name='id_Grupo_Horario' value={persona.id_Grupo_Horario || 0} onChange={ev => handleSelectChange(ev)}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              <option value={0} disabled>Seleccione Grupo</option>
              {
                data?.options.GruposHorario.map(grupo => (
                  <option key={grupo.id} value={grupo.id}>
                    {grupo.descripcion}
                  </option>
                ))
              }
            </select>
          </div>
        </section>

        <button className='absolute bottom-12 right-12 px-4 py-2 text-white bg-green-700 rounded-lg font-semibold hover:bg-green-600'>
          <span>Guardar Información</span>
        </button>
      </form>

      <button onClick={() => navigate('/empleados')}
        className='absolute bottom-12 right-64 px-4 py-2 text-white bg-red-700 rounded-lg font-semibold hover:bg-red-600'>
          <span>Cancelar</span>
      </button>

    </section>
  );
}