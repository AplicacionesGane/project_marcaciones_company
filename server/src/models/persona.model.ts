import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { GrupoTurnoVsHorario } from './gpTurnoVsHorario.model';
import { db_connection } from '../connections';
import { Area } from './areas.model';

class Persona extends Model<InferAttributes<Persona>, InferCreationAttributes<Persona>> {
  declare id: number
  declare tipoIdentificacion: string
  declare identificacion: string
  declare nombres: string
  declare apellidos: string
  declare estado: 'A' | 'R'
  declare id_Empresa: number
  declare id_Centro_Costos: number
  declare id_Grupo_Horario: number | null
  declare id_Areas: number | null
  declare id_Ciudad: number | null
  declare id_Cargo: number | null
  declare Area?: Area
  declare GrupoTurnoVsHorarios?: GrupoTurnoVsHorario[]
}

Persona.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  tipoIdentificacion: { type: DataTypes.STRING(50), allowNull: true},
  identificacion: { type: DataTypes.STRING(50), allowNull: false },
  nombres: { type: DataTypes.STRING, allowNull: false },
  apellidos: { type: DataTypes.STRING, allowNull: false },
  estado: { type: DataTypes.STRING, allowNull: false },
  id_Empresa: { type: DataTypes.INTEGER, allowNull: false },
  id_Centro_Costos: { type: DataTypes.INTEGER, allowNull: false },
  id_Grupo_Horario: { type: DataTypes.INTEGER, allowNull: true },
  id_Areas: { type: DataTypes.INTEGER, allowNull: false },
  id_Ciudad: { type: DataTypes.INTEGER, allowNull: false },
  id_Cargo: { type: DataTypes.INTEGER, allowNull: false },

}, {
  tableName: 'persona',
  sequelize: db_connection,
  timestamps: false,
});

export { Persona };

Persona.hasMany(GrupoTurnoVsHorario, { foreignKey: 'IdGrupoHorario', sourceKey: 'id_Grupo_Horario' });
Persona.hasOne(Area, { foreignKey: 'Id', sourceKey: 'id_Areas' });