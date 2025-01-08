import { createBrowserRouter } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const PersonasView = lazy(() => import('@/pages/persona/index'));
const InfoPersona = lazy(() => import('@/pages/persona/InfoPersona'));
const Marcacion = lazy(() => import('@/pages/marcacion/index'));
const AuditMarcacion = lazy(() => import('@/pages/marcacion/AuditMarcacion'));
const Areas = lazy(() => import('@/pages/opciones/views/Areas'));
const Cargos = lazy(() => import('@/pages/opciones/views/Cargos'));
const GrupoTurno = lazy(() => import('@/pages/opciones/views/GrupoTurno'));
const Turnos = lazy(() => import('@/pages/opciones/views/Turnos'));
const GrupovsTurno = lazy(() => import('@/pages/opciones/views/GrupovsTurno'));


import Root from './root';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense>,
      },
      {
        path: '/empleados',
        element: <PersonasView />,
      },
      {
        path: '/empleado/:id',
        element: <InfoPersona />,
      },
      {
        path: '/marcacion',
        element: <Marcacion />,
      },
      {
        path: '/audit-marcacion',
        element: <AuditMarcacion />,
      },
      {
        path: '/areas',
        element: <Areas />
      },
      {
        path: '/cargos',
        element: <Cargos />
      },
      {
        path: '/grupoturno',
        element: <GrupoTurno />
      },
      {
        path: '/turnos',
        element: <Turnos />
      },
      {
        path: '/grupo-turno',
        element: <GrupovsTurno />
      }
    ]
  }
]);