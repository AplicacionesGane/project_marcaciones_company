import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from '@/context/AuthProvider';
import { Outlet } from "react-router-dom";
import { LoginForm } from "@/app/Login";
import { Suspense } from "react";

export const Root = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <LoginForm />
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <Suspense fallback={<div>Loading...</div>}>
          <main className='w-full h-screen'>
            <Outlet />
          </main>
        </Suspense>
      </SidebarProvider>
    </>
  )

}