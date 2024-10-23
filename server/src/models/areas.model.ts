import { Model, DataTypes, Optional } from 'sequelize'
import { db_connection } from '../connections'

interface AreaAttributes {
  id: number;
  codigo: string;
  descripcion: string;
}

type AreaCreationAttributes = Optional<AreaAttributes, "id">;

class Area extends Model<AreaAttributes, AreaCreationAttributes> implements AreaAttributes {
  declare id: number;
  declare codigo: string;
  declare descripcion: string;
}

Area.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  codigo: { type: DataTypes.STRING(10), allowNull: false },
  descripcion: { type: DataTypes.STRING(50), allowNull: false }
}, {
  tableName: 'areas',
  sequelize: db_connection,
  timestamps: false
})

export { Area };
