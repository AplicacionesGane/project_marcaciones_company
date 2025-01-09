import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import NotFound from '@/app/Notfound';

const Home = lazy(() => import('@/app/Home'));

import { Root } from '@/routes/root';
import Personas from '@/app/personas/page';
import InfoPersona from '@/app/personas/infoPersona';
import Marcacion from '@/app/marcaciones/page';
import AuditMarcacion from '@/app/marcaciones/audit-marcaciones';
import Areas from '@/app/views/Areas';
import Cargos from '@/app/views/Cargos';
import GrupoTurno from '@/app/views/GrupoTurno';
import Turnos from '@/app/views/Turnos';
import GrupovsTurno from '@/app/views/GrupovsTurno';

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