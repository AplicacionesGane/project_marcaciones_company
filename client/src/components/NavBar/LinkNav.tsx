import { NavLink } from 'react-router-dom'

export const LinkNav = ({ link, text }: { link: string, text: string }) => {
  return (
    <li>
      <NavLink to={link} 
      className={({ isActive }) => isActive 
      ? 'block py-2 px-3  rounded hover:bg-gray-100 hover:bg-transparent border-0 text-blue-700 p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:bg-transparent underline' 
      : 'block py-2 px-3  rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-700 p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:bg-transparent'}>{text}
      </NavLink>
    </li>
  )
}