import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from '@/components/ui/sidebar'
import { DropdownMenu, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu'
export function TeamSwitcher() {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                M
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  Multired
                </span>
                <span className='truncate text-xs'>Grupo Empresarial</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
