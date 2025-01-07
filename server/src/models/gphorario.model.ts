import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { db_connection } from '../connections';

export class GrupoHorario extends Model<InferAttributes<GrupoHorario>, InferCreationAttributes<GrupoHorario>> {
  declare id: number;
  declare codigo: string;
  declare descripcion: string;
}

GrupoHorario.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    codigo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'grupohorario',
    sequelize: db_connection,
    timestamps: false,
  }
);