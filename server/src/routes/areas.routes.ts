import { getAreas, deleteArea, newArea, updateArea } from '../controllers/areas.controllers';
import { Router } from 'express';

export const areasRouter = Router();

areasRouter.get('/areas', getAreas);
areasRouter.post('/area', newArea);
areasRouter.put('/updatearea', updateArea);
areasRouter.delete('/area/:id', deleteArea);