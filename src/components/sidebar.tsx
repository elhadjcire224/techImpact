'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Home, Layers, Users, User } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton, SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/logo";
import { NavUser } from "@/components/nav_user";
import { useSession } from "next-auth/react";
import { Separator } from './ui/separator'

export const menuItems = [
  { name: 'Dashboard', icon: Home, href: '/dashboard' },
  { name: 'Ideas', icon: Layers, href: '/ideas' },
  { name: 'Members', icon: Users, href: '/members' },
]

export function AppSidebar() {
  const pathname = usePathname()
  const session = useSession()

  return (
    <Sidebar variant={'inset'} >
      <SidebarHeader className='h-16 flex items-start justify-center'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator orientation='horizontal' />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className={cn('flex flex-col gap-y-2 ')}>
              {menuItems.map((item) => (
                <SidebarMenuItem className={cn("flex items-center")} key={item.name}>
                  <SidebarMenuButton size={"lg"} asChild isActive={pathname === item.href} className={cn(" transition-colors", "rounded-md text-secondary-foreground hover:bg-sky-400/30",
                    "data-[active=true]:bg-sky-400/30 data-[active=true]:font-bold data-[active=true]:text-sky-400")}>
                    <Link prefetch href={item.href} >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>
      <Separator orientation='horizontal' />
      <SidebarFooter>
        <NavUser user={session.data?.user!} />
      </SidebarFooter>
    </Sidebar>
  )
}

