import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { TeamSwitcher } from '@/components/team-switcher'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { Settings2 } from 'lucide-react'

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Configuración',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'Áreas',
          url: '/areas',
        },
        {
          title: 'Cargos',
          url: '/cargos',
        },
        {
          title: 'Turnos',
          url: '/turnos',
        },
        {
          title: 'Grupos',
          url: '/grupoturno',
        },
        {
          title: 'Asignación Turnos',
          url: '/grupo-turno'
        }
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
