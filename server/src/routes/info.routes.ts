import { infoMarcaciones } from '../controllers/info.controllers';
import { Router } from 'express';

export const infoRoutes = Router();

infoRoutes.get('/infoMarcacion', infoMarcaciones);
