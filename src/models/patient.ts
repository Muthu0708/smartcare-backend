import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/db.js";

export interface PatientAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "Patient" | "Doctor";
  refreshToken?: string | null;
}

export interface PatientCreationAttributes
  extends Optional<PatientAttributes, "id" | "refreshToken"> { }

export class Patient
  extends Model<PatientAttributes, PatientCreationAttributes>
  implements PatientAttributes {

  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: "Patient" | "Doctor";
  declare refreshToken?: string | null;
}

Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("Patient", "Doctor"),
      allowNull: false,
      defaultValue: "Patient"
    },

    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    sequelize,
    tableName: "patients",

    indexes: [
      {
        fields: ["email"],
      },
    ],

    timestamps: true,
  });