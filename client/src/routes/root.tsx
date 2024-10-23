import { Suspense, lazy } from 'react';
import { useAuth } from '../auth/AuthContext';
import LoginPage from '../pages/LoginForm';

const NavBar = lazy(() => import('../components/NavBar/NavBar'));
const Outlet = lazy(() => import('react-router-dom').then(module => ({ default: module.Outlet })));
const Toaster = lazy(() => import('sonner').then(module => ({ default: module.Toaster })));

export default function Root() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <Outlet />
      <Toaster duration={4000} richColors position='top-right' visibleToasts={3} closeButton/>
    </Suspense>
  );
}