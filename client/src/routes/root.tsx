import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { useAuth } from '@/auth/AuthContext';
import { Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from 'sonner';

const LoginForm = lazy(() => import('@/components/login-form').then(module => ({ default: module.LoginForm })));

export default function Root() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <section className="w-screen h-screen flex items-center justify-center">
          <LoginForm />
        </section>
      </Suspense>
    )
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
      <Toaster duration={4000} richColors position='top-right' visibleToasts={3} />
    </>
  );
}