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

    const personas = await Persona.findAll({
      where: { estado: 'A' }
    })

    const stados = reduceStates(rows);

    const arrayMarcaciones = Object.entries(stados).map(([key, value], index) => {
      return {
        id: index + 1,
        marcacion: key,
        cantidad: value
      }
    })

    res.status(200).json({ count, marcaciones: arrayMarcaciones, totalPersona: personas.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' })
  }
}