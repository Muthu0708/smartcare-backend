import { Op, fn, col, where as sequelizeWhere } from "sequelize";
import { Appointment } from "../models/appointment.js";
import { Doctor } from "../models/doctor.js";
import { Patient } from "../models/patient.js";
import type { AppointmentStatus } from "../models/appointment.js";

// Create appointment
export const createAppointment = (data: any) => {
  return Appointment.create(data);
};

// Check slot already booked
export const findAppointment = (
  doctorId: number,
  date: string,
  time: string
) => {
  return Appointment.findOne({
    where: {
      doctorId,
      [Op.and]: [
        sequelizeWhere(fn("DATE", col("date")), date),
        { time },
        {
          status: {
            [Op.in]: ["Pending", "Accepted"],
          },
        },
      ],
    },
  });
};

// Find appointment by id
export const findAppointmentById = (id: number) => {
  return Appointment.findByPk(id);
};

// Get appointments for patient / doctor
export const getAppointments = async (
  userId: number,
  role: "Patient" | "Doctor"
) => {
  if (role === "Doctor") {
    return Appointment.findAll({
      where: { doctorId: userId },
      include: [
        {
          model: Patient,
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  return Appointment.findAll({
    where: { patientId: userId },
    include: [
      {
        model: Doctor,
        attributes: ["id", "name", "specialization", "image"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// Update status
export const updateStatus = async (id: number, status: AppointmentStatus) => {
  return Appointment.update({ status }, { where: { id } });
};

// Delete appointment
export const deleteAppointment = (id: number) => {
  return Appointment.destroy({ where: { id } });
};