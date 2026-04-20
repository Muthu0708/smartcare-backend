import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.MYSQLDATABASE || process.env.DB_NAME;
const dbUser = process.env.MYSQLUSER || process.env.DB_USER;
const dbPassword = process.env.MYSQLPASSWORD || process.env.DB_PASS;
const dbHost = process.env.MYSQLHOST || process.env.DB_HOST;
const dbPort = Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306);

export const sequelize = new Sequelize(
  dbName as string,
  dbUser as string,
  dbPassword as string,
  {
    host: dbHost as string,
    port: dbPort,
    dialect: "mysql",
    logging: false,
  }
);