import { Marcacion } from '../models/marcaciones.model';
import { Persona } from '../models/persona.model';
import { Request, Response } from 'express';
import { reduceStates } from '../utils';
import { fn, Op } from 'sequelize';

export async function infoMarcaciones(req: Request, res: Response) {

  try {
    const { rows, count } = await Marcacion.findAndCountAll({
      where: { Fecha: { [Op.eq]: fn('CURDATE') } }
    })

    const personas = await Persona.findAll({})

    const stados = reduceStates(rows);

    res.status(200).json({ count, stados, totalPersona: personas.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' })
  }
}