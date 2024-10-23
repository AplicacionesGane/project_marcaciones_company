import { WarningIcon, CheckIcon } from '../../components/icons'
import { usePersonas } from '../../hooks/usePersonas'
import { Loading } from '../../components/ui/Loading'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function PersonasView() {
  const { personas, setSearch, search, loading, error, fechtDataAgain } = usePersonas()
  const navigate = useNavigate()

  return (
    <section className='h-[92vh] overflow-y-auto'>

      <div className='flex items-center justify-around py-2 px-8 bg-gray-700 text-xs'>
        <form className='space-x-2'>
          <label htmlFor='search' className='w-36 text-white font-semibold'>Buscar empleado:</label>
          <input type='text' id='search' className='w-96 py-2 rounded-md px-2' placeholder='N° Identificación / Nombres' value={search} onChange={ev => setSearch(ev.target.value)} />
        </form>
        <div className='flex items-center gap-2 text-white'>
          <p>N° Empleados Registrados:</p>
          <p className='text-base font-semibold'>{personas.length}</p>
        </div>
        <button className='bg-blue-700 rounded-lg px-4 py-2 text-white hover:bg-blue-600 font-semibold' onClick={() => fechtDataAgain()}>Recargar Empleados</button>
      </div>

      {
        loading
          ? (
            <section className='h-[92vh] flex items-center justify-center pb-12'>
              <Loading>Cargando lista empleados</Loading>
            </section>
          )
          : (
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400 sticky top-0'>
                <tr>
                  <th className='px-1 py-2 text-center'>Id</th>
                  <th className='px-1 py-2'>N° Identicación</th>
                  <th className='px-1 py-2'>Apellidos</th>
                  <th className='px-1 py-2'>Nombres</th>
                  <th className='px-1 py-2'>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  personas.map((p) => (
                    <tr key={p.identificacion} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                      <td className='px-1 py-1 text-center'>{p.id}</td>
                      <td className='px-1 py-1 font-medium text-gray-900 dark:text-white'>{p.identificacion}</td>
                      <td className='px-1 py-1'>{p.apellidos}</td>
                      <td className='px-1 py-1'>{p.nombres}</td>
                      <td className='px-1 py-1 flex items-center gap-2'>
                        {
                          p.identificacion === p.apellidos && p.apellidos === p.nombres
                            ? <p className='text-red-600' title='El empleado le faltan datos básicos. Edite la información para agregarlos'><WarningIcon /></p>
                            : <p className='text-green-600'><CheckIcon /></p>
                        }
                        <button className='p-1 bg-blue-500 text-white rounded-md' onClick={() => navigate(`/empleado/${p.id}`)}>
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
      }

      {error && toast.error(error, { description: 'Error al cargar los empleados' })}

    </section>
  )
}

export default PersonasView
