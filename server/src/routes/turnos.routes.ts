import { getAllTurnos, deleteTurno, newTurno } from '../controllers/turnos.controllers';
import { Router } from 'express';

export const turnosRouter = Router();

turnosRouter.get('/turnos', getAllTurnos);
turnosRouter.post('/turno', newTurno);
turnosRouter.delete('/turno/:id', deleteTurno);