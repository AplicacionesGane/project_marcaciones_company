import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'
import { db_connection } from '../connections'

class Area extends Model<InferAttributes<Area>, InferCreationAttributes<Area>> {
  declare id?: number
  declare codigo: string
  declare descripcion: string
}

Area.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  codigo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'areas',
  sequelize: db_connection,
  timestamps: false
})

export { Area };
