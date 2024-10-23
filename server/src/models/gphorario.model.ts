import { DataTypes, Model, Optional } from "sequelize";
import { db_connection } from '../connections';

interface gpHorario {
  id: number;
  codigo: string;
  descripcion: string;
}

type gpHorarioCreationAttributes = Optional<gpHorario, "id">;

export class GrupoHorario extends Model<gpHorario, gpHorarioCreationAttributes>{
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
    tableName: "grupohorario",
    sequelize: db_connection,
    timestamps: false,
  }
);