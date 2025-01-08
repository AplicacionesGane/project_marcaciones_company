import { verifyArea } from '../schemas/areas';
import { Area } from '../models/areas.model';
import { Request, Response } from 'express';

export const getAreas = async (req: Request, res: Response) => {
  try {
    const areas = await Area.findAll({
      attributes: ['id', 'codigo', 'descripcion'],
    });
    res.status(200).json(areas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const newArea = async (req: Request, res: Response) => {
  const { success, data, error } = await verifyArea(req.body);

  if (!success) {
    res.status(400).json({
      message: error.errors[0].message,
    });
    return;
  }

  try {
    const exist = await Area.findOne({ where: { codigo: data.codigo } });

    if (exist) {
      res.status(400).json({ message: 'El código de área ya existe' });
      return;
    }

    const result = await Area.create({ codigo: data.codigo.toString(), descripcion: data.descripcion });

    if (!result) {
      res.status(400).json({ message: 'No se pudo crear el área' });
      return;
    }

    res.status(201).json({ message: 'Area Creada Correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteArea = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'id es requerido' });
    return;
  }

  try {
    const result = await Area.destroy({ where: { id } });
    if (!result) {
      res.status(400).json({ message: 'No se pudo eliminar el área' });
      return;
    }

    res.status(200).json({ message: 'Area Eliminada Correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateArea = async (req: Request, res: Response) => {
  const { id, codigo, nombre } = req.body;

  if (!id || !codigo || !nombre) {
    res.status(400).json({ message: 'id, código y nombre área son requeridos' });
    return;
  }

  try {
    const result = await Area.update({ codigo, descripcion: nombre }, { where: { id } });

    if (!result) {
      res.status(400).json({ message: 'No se pudo actualizar el área' });
      return;
    }

    res.status(200).json({ message: 'Area Actualizada Correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}