import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from '../config';
import { Sequelize } from 'sequelize';


const db_connection = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  timezone: '-05:00'
});

export { db_connection }