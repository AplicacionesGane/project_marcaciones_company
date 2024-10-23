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

  const opc = { [Op.between]: [fechaInitial, fechaFinal] };
  const opc1 = { [Op.eq]: fechaInitial };
  const opc3 = { [Op.eq]: fn('CURDATE') };

  try {
    const results = await Marcacion.findAll({
      attributes: ['Id', 'codigo', 'Fecha', 'Hora', 'estado'],
      where: { Fecha: fechaInitial && fechaFinal ? opc : fechaInitial ? opc1 : opc3 },
      include: [{
        attributes: ['nombres', 'apellidos'],
        model: Persona,
        include: [{ model: Area, attributes: ['descripcion'] }]
      }],
      order: [['Id', 'DESC']],
    });

    const marcaciones = results.map(m => {
      return {
        id: m.Id,
        documento: m.codigo,
        nombres: m.Persona!.nombres,
        apellidos: m.Persona!.apellidos,
        fecha: m.Fecha,
        hora: m.Hora,
        estado: m.estado,
        area: m.Persona!.Area ? m.Persona!.Area!.descripcion : 'Sin área'
      }
    }).sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

    res.status(200).json(marcaciones);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getAuditMarcacion = async (req: Request, res: Response) => {
  try {
    const result = await Marcacion.findAll({
      attributes: ['Id', 'Hora', 'estado'],
      where: { Fecha: { [Op.eq]: fn('CURDATE') } },
      include: [{
        attributes: ['nombres', 'apellidos'],
        model: Persona,
        as: 'Persona',
        where: { id_Grupo_Horario: { [Op.ne]: null } },
        include: [{
          attributes: ['diaSeman'],
          model: GrupoTurnoVsHorario,
          where: { diaSeman: getDayOfWeekString() },
          include: [{
            attributes: ['descripcion', 'hora_inicio'],
            model: Turnos
          }]
        }]
      }]
    });

    const marcaciones = result.map(marcacion => {
      return {
        id: marcacion.Id,
        nombres: marcacion.Persona.nombres,
        apellidos: marcacion.Persona.apellidos,
        hora: marcacion.Hora.toString().slice(0, 5),
        estado: marcacion.estado,
        hora_inicio: marcacion.Persona.GrupoTurnoVsHorarios[0].Turno.hora_inicio
      }
    })

    res.status(200).json(marcaciones);
  } catch (error) {
    console.error('Error al obtener las marcaciones:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};