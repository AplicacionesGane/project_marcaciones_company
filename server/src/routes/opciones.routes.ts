import { gellAllEmpresas, getAllGrupoTurnos, deleteGrupoTurno, newGrupoTurno, getAllGrupovsTurnos, createNewGrupovsTurnos, deleteGrupovsTurnos } from '../controllers/opciones.controllers';
import { Router } from 'express';

export const opcionesRouter = Router();

opcionesRouter.get('/empresas', gellAllEmpresas);

opcionesRouter.get('/grupo-turnos', getAllGrupoTurnos);
opcionesRouter.post('/grupo-turno', newGrupoTurno);
opcionesRouter.delete('/grupo-turno/:id', deleteGrupoTurno);

opcionesRouter.get('/grupovsturnos', getAllGrupovsTurnos);
opcionesRouter.post('/creategpvstur', createNewGrupovsTurnos);
opcionesRouter.delete('/grupovsturnos/:id', deleteGrupovsTurnos);