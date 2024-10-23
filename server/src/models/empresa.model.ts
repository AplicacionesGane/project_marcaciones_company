import { Model, DataTypes, Optional } from 'sequelize';
import { db_connection } from '../connections';

interface EmpresaAttributes {
  id: number;
  nombre: string;
  nit: string;
  direccion: string;
  contacto: string;
  email: string;
  telefono: string;
  ext: string;
  ciudad: string;
  observacion: string;
}

type EmpresaCreationAttributes = Optional<EmpresaAttributes, 'id'>;

class Empresa extends Model<EmpresaAttributes, EmpresaCreationAttributes> implements EmpresaAttributes {
  declare id: number;
  declare nombre: string;
  declare nit: string;
  declare direccion: string;
  declare contacto: string;
  declare email: string;
  declare telefono: string;
  declare ext: string;
  declare ciudad: string;
  declare observacion: string;
}

Empresa.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(255), allowNull: false },
  nit: { type: DataTypes.STRING(50), allowNull: true },
  direccion: { type: DataTypes.STRING(2000), allowNull: true },
  contacto: { type: DataTypes.STRING(255), allowNull: true },
  email: { type: DataTypes.STRING(50), allowNull: true },
  telefono: { type: DataTypes.STRING(255), allowNull: true },
  ext: { type: DataTypes.STRING(255), allowNull: true },
  ciudad: { type: DataTypes.STRING(200), allowNull: true },
  observacion: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'empresa',
  sequelize: db_connection,
  timestamps: false
});

export { Empresa };