import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import NotFound from '@/app/Notfound';

const Home = lazy(() => import('@/app/Home'));
const Personas = lazy(() => import('@/app/personas/page'));
const InfoPersona = lazy(() => import('@/app/personas/infoPersona'));
const Marcacion = lazy(() => import('@/app/marcaciones/page'));
const AuditMarcacion = lazy(() => import('@/app/marcaciones/audit-marcaciones'));
const Areas = lazy(() => import('@/app/views/Areas'));
const Cargos = lazy(() => import('@/app/views/Cargos'));
const GrupoTurno = lazy(() => import('@/app/views/GrupoTurno'));
const Turnos = lazy(() => import('@/app/views/Turnos'));
const GrupovsTurno = lazy(() => import('@/app/views/GrupovsTurno'));

import { Root } from '@/routes/root';


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
        element: <Suspense fallback={<div>Loading...</div>}><Personas /></Suspense>,
      },
      {
        path: '/empleado/:id',
        element: <Suspense fallback={<div>Loading...</div>}><InfoPersona /></Suspense>,
      },
      {
        path: '/marcacion',
        element: <Suspense fallback={<div>Loading...</div>}><Marcacion /></Suspense>,
      },
      {
        path: '/audit-marcacion',
        element: <Suspense fallback={<div>Loading...</div>}><AuditMarcacion /></Suspense>,
      },

      {
        path: '/areas',
        element: <Suspense fallback={<div>Loading...</div>}><Areas /></Suspense>,
      },
      {
        path: '/cargos',
        element: <Suspense fallback={<div>Loading...</div>}><Cargos /></Suspense>,
      },
      {
        path: '/grupoturno',
        element: <Suspense fallback={<div>Loading...</div>}><GrupoTurno /></Suspense>,
      },
      {
        path: '/turnos',
        element: <Suspense fallback={<div>Loading...</div>}><Turnos /></Suspense>,
      },
      {
        path: '/grupo-turno',
        element: <Suspense fallback={<div>Loading...</div>}><GrupovsTurno /></Suspense>,
      }

    ]
  }
])