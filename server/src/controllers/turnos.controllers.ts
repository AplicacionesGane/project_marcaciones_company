import { GrupoTurnoVsHorario } from '../models/gpTurnoVsHorario.model';
import { Turnos } from '../models/turnos.model';
import { Request, Response } from 'express';

export const getAllTurnos = async (req: Request, res: Response) => {
  try {
    const turnos = await Turnos.findAll({
      order: [['codigo', 'ASC']]
    });
    res.status(200).json(turnos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const newTurno = async (req: Request, res: Response) => {
  const { codigo, descripcion, hora_inicio, hora_fin, hora_inicio_break, teorico, hora_fin_break, tiempo_breack, conceptos } = req.body;

  if (!codigo || !descripcion || !hora_inicio || !hora_fin || !teorico) {
    res.status(400).json({ message: 'Todos los campos son requeridos' });
    return;
  }

  try {
    const exist = await Turnos.findOne({ where: { codigo } });

    if (exist) {
      res.status(400).json({ message: 'El código de turno ya existe' });
      return;
    }

    const result = await Turnos.create({ codigo, descripcion, hora_inicio, hora_fin, teorico, hora_inicio_break, hora_fin_break, tiempo_breack, conceptos });

    if (!result) {
      res.status(400).json({ message: 'No se pudo crear el turno' });
      return;
    }

    res.status(201).json({ message: 'Turno Creado Correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteTurno = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'id es requerido' });
    return;
  }

  try {
    const existInGrupo = await GrupoTurnoVsHorario.findOne({ where: { IdHorario: id } });

    if (existInGrupo) {
      res.status(400).json({ message: 'No se puede eliminar el turno, ya que se encuentra ligado a un grupo' });
      return;
    }

    const result = await Turnos.destroy({ where: { id } });
    if (!result) {
      res.status(400).json({ message: 'No se pudo eliminar el turno' });
      return;
    }

    res.status(200).json({ message: 'Turno Eliminado Correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}