import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '../auth/AuthContext';
import { Suspense, lazy } from 'react';

const Outlet = lazy(() => import('react-router-dom').then(module => ({ default: module.Outlet })));
const Toaster = lazy(() => import('sonner').then(module => ({ default: module.Toaster })));

export default function Root() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <section className="w-screen h-screen flex items-center justify-center">
        <LoginForm />
      </section>
    )
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SidebarProvider>
        <AppSidebar />
        <main className='w-full h-screen'>
          <Outlet />
        </main>
      </SidebarProvider>
      <Toaster duration={4000} richColors position='top-right' visibleToasts={3} closeButton />
    </Suspense>
  );
}