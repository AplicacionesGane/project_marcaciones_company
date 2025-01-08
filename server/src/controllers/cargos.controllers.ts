import { Cargo } from '../models/cargos.model';
import { Request, Response } from 'express';
import { verifyCargo } from '../schemas/cargos';

export const getAllCargos = async (req: Request, res: Response) => {
  try {
    const cargos = await Cargo.findAll({
      order: [['codigo', 'ASC']]
    });
    res.status(200).json(cargos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const newCargo = async (req: Request, res: Response) => {
  const { success, data, error } = await verifyCargo(req.body);

  if (!success) {
    res.status(400).json({
      message: error.errors[0].message,
    });
    return;
  }

  try {
    const exist = await Cargo.findOne({ where: { codigo: data.codigo } });

    if (exist) {
      res.status(400).json({ message: 'El código de cargo ya existe' });
      return;
    }

    const result = await Cargo.create({
      codigo: data.codigo.toString(),
      descripcion: data.descripcion
    });

    if (!result) {
      res.status(400).json({ message: 'No se pudo crear el cargo' });
      return;
    }

    res.status(201).json({ message: 'Cargo Creado Correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteCargo = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'id es requerido' });
    return;
  }

  try {
    const result = await Cargo.destroy({ where: { ID: id } });
    if (!result) {
      res.status(400).json({ message: 'No se pudo eliminar el cargo' });
      return;
    }

    res.status(200).json({ message: 'Cargo Eliminado Correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateCargo = async (req: Request, res: Response) => {
  const { id, codigo, nombre } = req.body;

  if (!id || !codigo || !nombre) {
    res.status(400).json({ message: 'id, código y nombre cargo son requeridos' });
    return;
  }

  try {
    const result = await Cargo.update({ codigo, descripcion: nombre }, { where: { ID: id } });

    if (!result) {
      res.status(400).json({ message: 'No se pudo actualizar el cargo' });
      return;
    }

    res.status(200).json({ message: 'Cargo Actualizado Correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}