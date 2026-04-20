import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.MYSQLDATABASE as string,
  process.env.MYSQLUSER as string,
  process.env.MYSQLPASSWORD as string,
  {
    host: process.env.MYSQLHOST as string,
    port: Number(process.env.MYSQLPORT),
    dialect: "mysql",
    logging: false,
  }
);


