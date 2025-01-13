import { GrupoTurnoVsHorario } from '../models/gpTurnoVsHorario.model';
import { Marcacion } from '../models/marcaciones.model';
import { Persona } from '../models/persona.model';
import { Turnos } from '../models/turnos.model';
import { Area } from '../models/areas.model';
import { Request, Response } from 'express';
import { fn, Op } from 'sequelize';

const getDayOfWeekString = (): string => {
  const dayIndex = new Date().getDay();
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return daysOfWeek[dayIndex];
};

export const getMarcaciones = async (req: Request, res: Response) => {
  const fechaInitial = req.query.fechaInitial as string;
  const fechaFinal = req.query.fechaFinal as string;

  try {
    const marcaciones = await Marcacion.findAll({
      where: {
        Fecha: fechaInitial && fechaFinal
          ? { [Op.between]: [fechaInitial, fechaFinal] } : fechaInitial
            ? { [Op.eq]: fechaInitial } : { [Op.eq]: fn('CURDATE') }
      },
      include: [{
        attributes: ['nombres', 'apellidos'],
        model: Persona,
        include: [{
          attributes: ['descripcion'],
          model: Area,
        }]
      }],
      order: [['Fecha', 'DESC'], ['Hora', 'DESC']]
    })

    res.status(200).json(marcaciones)
    return
  } catch (error) {
    res.status(500).json({ message: 'Error on execute get all Marcaciones' })
    return
  }

}

export const getAuditMarcacion = async (req: Request, res: Response) => {
  const { fecha, estado } = req.body;

  if (!fecha || !estado) {
    res.status(400).json({ message: 'Estado y fecha son requeridos' });
    return
  }

  try {
    const auditMarcaciones = await Marcacion.findAll({
      attributes: ['Id', 'Hora', 'estado'],
      where: { Fecha: { [Op.eq]: fecha }, estado: { [Op.eq]: estado } },
      include: [{
        attributes: ['nombres', 'apellidos'],
        model: Persona,
        where: { id_Grupo_Horario: { [Op.ne]: null } },
        include: [{
          attributes: ['id', 'IdGrupoHorario', 'diaSeman'],
          where: { diaSeman: getDayOfWeekString() },
          model: GrupoTurnoVsHorario,
          include: [{
            model: Turnos
          }]
        }]
      }]
    });

    const marcaciones = auditMarcaciones.map(m => {
      return {
        id: m.Id,
        nombres: m.Persona?.nombres,
        apellidos: m.Persona?.apellidos,
        hora: m.Hora.toString().slice(0, 5),
        estado: m.estado,
        hora_inicio: m.Persona?.GrupoTurnoVsHorarios?.[0].Turno?.hora_inicio,
        hora_fin: m.Persona?.GrupoTurnoVsHorarios?.[0].Turno?.hora_fin
      }
    })

    res.status(200).json(marcaciones);
  } catch (error) {
    console.error('Error al obtener las marcaciones:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};