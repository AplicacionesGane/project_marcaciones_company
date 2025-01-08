import { Marcacion } from '../models/marcaciones.model';
import { Persona } from '../models/persona.model';
import { Area } from '../models/areas.model';
import { Request, Response } from 'express';
import { reduceStates } from '../utils';
import { fn, Op, col, literal } from 'sequelize';
import { z } from 'zod';

export async function infoMarcaciones(req: Request, res: Response) {
  const { fecha } = req.query

  const strValidate = z.string().min(6)
  const { success, data, error } = strValidate.safeParse(fecha)

  try {
    const { rows, count } = await Marcacion.findAndCountAll({
      where: { Fecha: { [Op.eq]: success ? data : fn('CURDATE') } }
    })

    const { count: countPer } = await Persona.findAndCountAll({
      where: { estado: 'A' }
    })

    const areas = await Persona.findAll({
      attributes: [
        [fn('COUNT', col('Persona.id')), 'cant'],
        [col('Area.descripcion'), 'des']
      ],
      include: [{
        model: Area,
        attributes: []
      }],
      where: {
        estado: 'A'
      },
      group: ['Area.descripcion'],
      order: literal('DES')
    });

    const stados = reduceStates(rows);

    const arrayMarcaciones = Object.entries(stados).map(([key, value], index) => {
      return {
        id: index + 1,
        marcacion: key,
        cantidad: value
      }
    })

    res.status(200).json({ count, marcaciones: arrayMarcaciones, totalPersona: countPer, areas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' })
  }
}