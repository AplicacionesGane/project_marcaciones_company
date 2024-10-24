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
        horaMarcacion: m.Hora,
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
      where: { Fecha: { [Op.eq]: fn('CURDATE') }, estado: { [Op.or]: ['Entrada', 'Salida'] } },
      include: {
        attributes: ['nombres', 'apellidos'],
        where: { id_Grupo_Horario: { [Op.ne]: null } },
        model: Persona,
        include: [{
          model: GrupoTurnoVsHorario,
          attributes: ['diaSeman'],
          include: [{
            model: Turnos,
            attributes: ['hora_inicio', 'hora_fin']
          }]
        }]
      },
      order: [['Id', 'DESC']]
    })

    const marcaciones = result.map(m => {
      const turno = m.Persona.GrupoTurnoVsHorarios !== undefined ? m.Persona.GrupoTurnoVsHorarios.filter(t => t.diaSeman === getDayOfWeekString())[0].Turno : null;
      const horaMarcacion = m.Hora.toString().substring(0, 5);

      let horaInicio = '';
      let horaFin = '';

      if(turno !== null){
        horaInicio = turno.hora_inicio.toString()
        horaFin = turno.hora_fin.toString()
      }

      if(m.estado === 'Entrada'){
        return {
          id: m.Id,
          horaMarcacion: m.Hora.toString().substring(0, 5),
          estado: m.estado,
          nombres: m.Persona.nombres,
          apellidos: m.Persona.apellidos,
          horaEstimada: horaInicio,
          audit: horaMarcacion > horaInicio ? 'Tarde' : 'A tiempo'
        }
      } else if (m.estado === 'Salida'){
        return {
          id: m.Id,
          horaMarcacion: m.Hora.toString().substring(0, 5),
          estado: m.estado,
          nombres: m.Persona.nombres,
          apellidos: m.Persona.apellidos,
          horaEstimada: horaFin, 
          audit: horaMarcacion < horaFin ? 'Temprano' : 'A tiempo'
        }
      }
    })

    res.status(200).json(marcaciones);
  } catch (error) {
    console.error('Error al obtener las marcaciones:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};