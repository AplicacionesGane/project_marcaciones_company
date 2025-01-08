import { getAllCargos, deleteCargo, newCargo, updateCargo } from '../controllers/cargos.controllers';
import { Router } from 'express';

export const cargosRouter = Router();

cargosRouter.get('/cargos', getAllCargos);
cargosRouter.post('/cargo', newCargo);
cargosRouter.put('/updatecargo', updateCargo);
cargosRouter.delete('/cargo/:id', deleteCargo);