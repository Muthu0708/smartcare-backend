import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/db.js";

export interface DoctorAttributes {
  id: number;
  name:string;
  email:string;
  password?:string;
  specialization?: string;
  experience:string;
  fees?: number;
  slots: string[];
  image?: string;
}

export interface DoctorCreationAttributes
  extends Optional<DoctorAttributes, "id"> { }

export class Doctor
  extends Model<DoctorAttributes, DoctorCreationAttributes>
  implements DoctorAttributes {
  declare id: number;
  declare name:string;
  declare email:string;
  declare password?: string;
  declare specialization?: string;
  declare experience:string;
  declare fees?: number;
  declare slots: string[];
  declare image?: string;
}

Doctor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    password:{
      type:DataTypes.STRING,
    },
    specialization: {
      type: DataTypes.STRING,
    },
    experience:{
      type:DataTypes.STRING,
      allowNull:false
    },
    fees: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:0
    },
    slots: {
      type: DataTypes.JSON,
    },
     image: {
      type: DataTypes.STRING,
    },
  },
  
  {
    sequelize,
    tableName: "doctors",
    timestamps: true,
  }
);