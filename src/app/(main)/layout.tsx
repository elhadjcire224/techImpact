// app/(main)/layout.tsx
import { PageBreadcrumb } from "@/components/header_breadcrumb"
import { Header } from "@/components/headers/header"
import { AppSidebar } from "@/components/sidebar"
import { ModeToggle } from "@/components/toggle_theme_button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) return redirect('/')
  if (session.user.onboardingCompleted === false) return redirect('/onboarding')
  return (
    <SidebarProvider>
      <AppSidebar />
      <Header />
      <SidebarInset className="">
        <header className=" hidden md:flex md:h-16 md:shrink-0 md:items-center md:justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <PageBreadcrumb />
          </div>
          <div className="px-4">
            <ModeToggle />
          </div>
        </header>
        <Separator orientation="horizontal" />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}