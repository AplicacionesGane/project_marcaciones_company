import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { GrupoTurnoVsHorario } from './gpTurnoVsHorario.model';
import { db_connection } from '../connections';
import { Area } from './areas.model';

class Persona extends Model<InferAttributes<Persona>, InferCreationAttributes<Persona>> {
  declare id: number;
  declare identificacion: string;
  declare nombres: string;
  declare apellidos: string;
  declare id_Empresa: number | null;
  declare estado: 'A' | 'R';
  declare id_Grupo_Horario: number | null;
  declare id_Areas: number | null;
  declare id_Ciudad: number | null;
  declare id_Centro_Costos: number | null;
  declare id_Cargo: number | null;
  declare GrupoTurnoVsHorarios?: GrupoTurnoVsHorario[]
}

Persona.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true, },
  identificacion: { type: DataTypes.STRING, allowNull: false },
  nombres: { type: DataTypes.STRING, allowNull: false },
  apellidos: { type: DataTypes.STRING, allowNull: false },
  id_Empresa: { type: DataTypes.INTEGER, allowNull: false },
  estado: { type: DataTypes.STRING, allowNull: false },
  id_Grupo_Horario: { type: DataTypes.INTEGER, allowNull: true },
  id_Areas: { type: DataTypes.INTEGER, allowNull: false },
  id_Ciudad: { type: DataTypes.INTEGER, allowNull: false },
  id_Centro_Costos: { type: DataTypes.INTEGER, allowNull: false },
  id_Cargo: { type: DataTypes.INTEGER, allowNull: false },

}, {
  tableName: 'persona',
  sequelize: db_connection,
  timestamps: false,
});

export { Persona };

Persona.hasMany(GrupoTurnoVsHorario, { foreignKey: 'IdGrupoHorario', sourceKey: 'id_Grupo_Horario' });
Persona.hasOne(Area, { foreignKey: 'Id', sourceKey: 'id_Areas' });