import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import NotFound from "@/app/Notfound";

const Home = lazy(() => import("@/app/Home"));

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
      }
    ]
  }
])