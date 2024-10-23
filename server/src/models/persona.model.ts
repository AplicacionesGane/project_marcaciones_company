import { GrupoTurnoVsHorario } from './gpTurnoVsHorario.model';
import { Model, DataTypes, Optional } from 'sequelize';
import { db_connection } from '../connections';
import { Area } from './areas.model';

interface PersonaAttributes {
  id: number;
  identificacion: string;
  nombres: string;
  apellidos: string;
  id_Empresa: number;
  estado: string;
  id_Grupo_Horario: number | null;
  id_Areas: number;
  id_Ciudad: number;
  id_Centro_Costos: number;
  id_Cargo: number;
}

type PersonaCreationAttributes = Optional<PersonaAttributes, 'id'>;

class Persona extends Model<PersonaAttributes, PersonaCreationAttributes> implements PersonaAttributes {
  declare id: number;
  declare identificacion: string;
  declare nombres: string;
  declare apellidos: string;
  declare id_Empresa: number;
  declare estado: string;
  declare id_Grupo_Horario: number | null;
  declare id_Areas: number;
  declare id_Ciudad: number;
  declare id_Centro_Costos: number;
  declare id_Cargo: number;
  declare GrupoTurnoVsHorarios: GrupoTurnoVsHorario[];
  declare Area: Area | null;
}

Persona.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
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