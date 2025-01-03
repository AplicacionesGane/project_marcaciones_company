import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { db_connection } from '../connections';

export class Cargo extends Model<InferAttributes<Cargo>, InferCreationAttributes<Cargo>> {
  declare ID?: number;
  declare codigo: string;
  declare descripcion: string;
}

Cargo.init(
  {
    ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    codigo: { type: DataTypes.STRING(200), allowNull: false },
    descripcion: { type: DataTypes.STRING(200), allowNull: false },
  },
  {
    tableName: 'cargos',
    sequelize: db_connection,
    timestamps: false,
  }
);