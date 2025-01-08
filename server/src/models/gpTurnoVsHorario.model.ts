import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { GrupoHorario } from './gphorario.model';
import { db_connection } from '../connections';
import { Turnos } from './turnos.model';

export class GrupoTurnoVsHorario extends Model<InferAttributes<GrupoTurnoVsHorario>, InferCreationAttributes<GrupoTurnoVsHorario>> {
  declare id?: number;
  declare IdGrupoHorario: number;
  declare IdHorario: number;
  declare diaSeman: string;
  declare Turno?: Turnos;
}

GrupoTurnoVsHorario.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    IdGrupoHorario: { type: DataTypes.INTEGER, allowNull: false },
    IdHorario: { type: DataTypes.INTEGER, allowNull: false },
    diaSeman: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'grupohorario_horario',
    sequelize: db_connection,
    timestamps: false,
  }
);

GrupoTurnoVsHorario.belongsTo(GrupoHorario, { foreignKey: 'IdGrupoHorario', targetKey: 'id' })
GrupoTurnoVsHorario.belongsTo(Turnos, { foreignKey: 'IdHorario', targetKey: 'id' })