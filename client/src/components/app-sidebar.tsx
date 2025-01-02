import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { Frame, Map, PieChart, Settings2 } from 'lucide-react'
import { TeamSwitcher } from '@/components/team-switcher'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'

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
          title: 'Grupo Turnos',
          url: '/grupoturno',
        },
        {
          title: 'Grupo Turno - Turno',
          url: '/grupo-turno'
        }
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
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
