import { DataTypes, Model, Optional } from 'sequelize';
import { db_connection } from '../connections';
import { Persona } from './persona.model';

interface MarcacionAttributes {
  Id: number;
  codigo: string;
  Fecha: Date;
  Hora: Date;
  estado: string;
  dispositivo: string;
}

type MarcacionCreationAttributes = Optional<MarcacionAttributes, 'Id'>;

export class Marcacion extends Model<MarcacionAttributes, MarcacionCreationAttributes> implements MarcacionAttributes {
  declare Id: number;
  declare codigo: string;
  declare Fecha: Date;
  declare Hora: Date;
  declare estado: string;
  declare dispositivo: string;
  declare Persona: Persona;
}

Marcacion.init(
  {
    Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    codigo: { type: DataTypes.STRING, allowNull: false, },
    Fecha: { type: DataTypes.DATE, allowNull: false, },
    Hora: { type: DataTypes.TIME, allowNull: false, },
    estado: { type: DataTypes.STRING, allowNull: false, },
    dispositivo: { type: DataTypes.STRING, allowNull: false, },
  },
  {
    tableName: 'registrostiempos',
    sequelize: db_connection,
    timestamps: false
  }
);

Marcacion.belongsTo(Persona, {  foreignKey: 'codigo',  targetKey: 'identificacion'});