import { getAllTurnos, deleteTurno, newTurno, editTurno } from '../controllers/turnos.controllers';
import { Router } from 'express';

export const turnosRouter = Router();

turnosRouter.get('/turnos', getAllTurnos);
turnosRouter.post('/turno', newTurno);
turnosRouter.put('/turno', editTurno);
turnosRouter.delete('/turno/:id', deleteTurno);