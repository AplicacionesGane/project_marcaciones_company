import { GrupoTurnoVsHorario } from '../models/gpTurnoVsHorario.model';
import { GrupoHorario } from '../models/gphorario.model';
import { Persona } from '../models/persona.model';
import { Empresa } from '../models/empresa.model';
import { Turnos } from '../models/turnos.model';
import { Request, Response } from 'express';

// TODO: este codigo está muy extenso y se puede refactorizar en funciones más pequeñas

export const gellAllEmpresas = async (req: Request, res: Response) => {
  try {
    const empresas = await Empresa.findAll();
    res.status(200).json(empresas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getAllGrupoTurnos = async (req: Request, res: Response) => {
  try {
    const grupoTurnos = await GrupoHorario.findAll();
    res.status(200).json(grupoTurnos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const newGrupoTurno = async (req: Request, res: Response) => {
  const { codigo, nombre } = req.body;

  if (!codigo || !nombre) {
    res.status(400).json({ message: 'código y descripción grupo turno son requeridos' });
    return;
  }

  try {
    const exist = await GrupoHorario.findOne({ where: { codigo } });

    if (exist) {
      res.status(400).json({ message: 'El código de grupo turno ya existe' });
      return;
    }

    const result = await GrupoHorario.create({ codigo, descripcion: nombre });

    if (!result) {
      res.status(400).json({ message: 'No se pudo crear el grupo turno' });
      return;
    }

    res.status(201).json({ message: 'Grupo Turno Creado Correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteGrupoTurno = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'id es requerido' });
    return;
  }

  try {
    const existeGpHorario = await GrupoTurnoVsHorario.findOne({ where: { IdGrupoHorario: id } });
    if (existeGpHorario) {
      res.status(400).json({ message: 'No se puede eliminar el grupo turno, ya que contiene turnos asignados' });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al consultar la table Grupo Vs Horario' });
  }

  try {

    const result2 = await Persona.findAll({ where: { id_Grupo_Horario: id } });

    result2.map(async (persona) => {
      await persona.update({ id_Grupo_Horario: null });
    });

    const result = await GrupoHorario.destroy({ where: { id } });
    if (!result) {
      res.status(400).json({ message: 'No se pudo eliminar el grupo turno' });
      return;
    }

    res.status(200).json({ message: 'Grupo Turno Eliminado Correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getAllGrupovsTurnos = async (req: Request, res: Response) => {
  try {
    const horario = await Turnos.findAll({ attributes: ['id', 'descripcion'] });
    const grupoHorario = await GrupoHorario.findAll({ attributes: ['id', 'descripcion'] });
    const horariosAsginados = await GrupoTurnoVsHorario.findAll({
      include: [
        { model: GrupoHorario, attributes: ['id', 'descripcion'] },
        { model: Turnos, attributes: ['id', 'descripcion'] }
      ]
    });

    res.status(200).json({ horario, grupoHorario, asignados: horariosAsginados });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteGrupovsTurnos = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'id es requerido' });
    return;
  }

  try {
    const result = await GrupoTurnoVsHorario.destroy({ where: { id } });
    if (!result) {
      res.status(400).json({ message: 'No se pudo eliminar el grupo turno' });
      return;
    }

    res.status(200).json({ message: 'Grupo Turno Eliminado Correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const createNewGrupovsTurnos = async (req: Request, res: Response) => {
  const { grupoHorario, turno, dias } = req.body;

  console.log(req.body);

  if (!grupoHorario || !turno || !Array.isArray(dias) || dias.length === 0) {
    res.status(400).json({ message: 'grupoHorario, turno y días son requeridos y días debe ser un array no vacío' });
    return;
  }

  try {
    await Promise.all(dias.map((dia: string) => {
      return GrupoTurnoVsHorario.create({ IdGrupoHorario: grupoHorario, IdHorario: turno, diaSeman: dia });
    }));

    res.status(201).json({ message: 'Grupo Turnos Creado Correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}