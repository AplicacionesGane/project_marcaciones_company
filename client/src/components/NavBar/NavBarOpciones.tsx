import { NavLink } from "react-router-dom"

const LinkRoutes = [
  { id: 1, name: 'Areas', path: '/opciones/areas' },
  { id: 2, name: 'Cargos', path: '/opciones/cargos' },
  { id: 3, name: 'Turnos', path: '/opciones/turnos' },
  { id: 4, name: 'Grupo Turnos', path: '/opciones/grupoturno' },
  { id: 5, name: 'Grupo Turno - Turno', path: '/opciones/grupo-turno' }
]

export const NavBarOpciones = () => {
  return (
    <>
      <ul className='py-2 text-gray-700 dark:text-gray-200 text-lg'>
        {LinkRoutes.map((link) => (
          <li key={link.id}>
            <NavLink to={link.path} className={({ isActive }) =>  isActive 
            ? "block px-6 py-3 text-sm 2xl:text-xl bg-blue-100 font-medium dark:bg-blue-600 dark:hover:bg-gray-600 dark:hover:text-white" 
            : 'block px-6 py-3 text-sm 2xl:text-xl hover:bg-yellow-100 hover:font-medium dark:hover:bg-gray-600 dark:hover:text-white' }>
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}