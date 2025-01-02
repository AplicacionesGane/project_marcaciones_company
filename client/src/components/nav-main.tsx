import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CheckCircle, ChevronRight, LayoutDashboard, TimerIcon, Users, type LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"

export function NavMain({ items }: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenuSubButton asChild className="my-1">
        <Link to="/">
          <LayoutDashboard className="w-6 h-6" />
          Dashboard
        </Link>
      </SidebarMenuSubButton>
      <SidebarMenuSubButton asChild className="my-1">
        <Link to="/empleados">
          <Users className="w-6 h-6" />
          Empleados
        </Link>
      </SidebarMenuSubButton>
      <SidebarMenuSubButton asChild className="my-1">
        <Link to="/marcacion">
          <TimerIcon className="w-6 h-6" />
          Marcaciones
        </Link>
      </SidebarMenuSubButton>

      <SidebarMenuSubButton asChild className="my-1">
        <Link to="/audit-marcacion">
          <CheckCircle className="w-6 h-6" />
          Auditoria Marcaciones
        </Link>
      </SidebarMenuSubButton>

      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link to={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
