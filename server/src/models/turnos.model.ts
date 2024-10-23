import { DataTypes, Model, Optional } from "sequelize";
import { db_connection } from '../connections';

interface TurnoAttributes {
  id: number;
  codigo: string;
  descripcion: string;
  hora_inicio: string;
  hora_fin: string;
  teorico: string;
  hora_inicio_break: string;
  hora_fin_break: string;
  tiempo_breack: string;
  conceptos: string;
}

type TurnoCreationAttributes = Optional<TurnoAttributes, "id" | 'hora_inicio_break' | 'hora_fin_break' | 'tiempo_breack'>;

export class Turnos extends Model<TurnoAttributes, TurnoCreationAttributes> implements TurnoCreationAttributes {
  declare id: number;
  declare codigo: string;
  declare descripcion: string;
  declare hora_inicio: string;
  declare hora_fin: string;
  declare teorico: string;
  declare hora_inicio_break: string;
  declare hora_fin_break: string;
  declare tiempo_breack: string;
  declare conceptos: string;
}

Turnos.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    codigo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false },
    hora_inicio: { type: DataTypes.STRING, allowNull: false },
    hora_fin: { type: DataTypes.STRING, allowNull: false },
    teorico: { type: DataTypes.STRING, allowNull: true },
    hora_inicio_break: { type: DataTypes.STRING, allowNull: true },
    hora_fin_break: { type: DataTypes.STRING, allowNull: true },
    tiempo_breack: { type: DataTypes.STRING, allowNull: true },
    conceptos: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "turnotiempos",
    sequelize: db_connection,
    timestamps: false,
  }
);
