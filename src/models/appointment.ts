import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/db.js";

export type AppointmentStatus = "Pending" | "Accepted" | "Rejected" | "Completed";

export interface AppointmentAttributes {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  time: string;
  status: AppointmentStatus;
  
}

export interface AppointmentCreationAttributes
  extends Optional<AppointmentAttributes, "id" | "status"> { }

export class Appointment
  extends Model<AppointmentAttributes, AppointmentCreationAttributes>
  implements AppointmentAttributes {
  declare id: number;
  declare patientId: number;
  declare doctorId: number;
  declare date: string;
  declare time: string;
  declare status: AppointmentStatus;
  
}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Pending", "Accepted", "Rejected", "Completed"),
      defaultValue: "Pending",
    },
  
  },
  {
    sequelize,
    tableName: "appointments",
    timestamps: true,
  }
);