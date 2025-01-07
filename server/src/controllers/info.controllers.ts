import { Marcacion } from '../models/marcaciones.model';
import { Persona } from '../models/persona.model';
import { Area } from '../models/areas.model';
import { Request, Response } from 'express';
import { reduceStates } from '../utils';
import { fn, Op, col } from 'sequelize';

export async function infoMarcaciones(req: Request, res: Response) {
  try {
    const { rows, count } = await Marcacion.findAndCountAll({
      where: { Fecha: { [Op.eq]: fn('CURDATE') } }
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
      group: ['Area.descripcion']
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