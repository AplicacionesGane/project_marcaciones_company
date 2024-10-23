import { DataTypes, Model, Optional } from "sequelize";
import { db_connection } from '../connections';

interface CargoAttributes {
  ID: number;
  codigo: string;
  descripcion: string;
}

type CargoCreationAttributes = Optional<CargoAttributes, "ID">;

export class Cargo extends Model<CargoAttributes, CargoCreationAttributes> implements CargoAttributes {
  declare ID: number;
  declare codigo: string;
  declare descripcion: string;
}

Cargo.init(
  {
    ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    codigo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "cargos",
    sequelize: db_connection,
    timestamps: false,
  }
);