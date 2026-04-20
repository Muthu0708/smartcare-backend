import * as appointmentRepo from "../repositeries/appointmentRepo.js";
import { Doctor } from "../models/doctor.js";
import type {
  AppointmentAttributes,
  AppointmentStatus,
} from "../models/appointment.js";

type UserType = {
  id: number;
  role: "Patient" | "Doctor";
};

const normalizeTime = (time: string) => {
  let value = time.trim().replace(".", ":");

  // 10:00 -> 10:00:00
  if (/^\d{1,2}:\d{2}$/.test(value)) {
    value = `${value}:00`;
  }

  return value;
};

// Book appointment
export const BookAppointment = async (data: AppointmentAttributes) => {
  if (!data.doctorId) {
    throw new Error("Doctor ID is required");
  }

  if (!data.date || !data.time) {
    throw new Error("Date and time are required");
  }

  const normalizedDate =
    typeof data.date === "string"
      ? data.date.slice(0, 10)
      : new Date(data.date).toISOString().slice(0, 10);

  const normalizedTime = normalizeTime(String(data.time));

  const exists = await appointmentRepo.findAppointment(
    data.doctorId,
    normalizedDate,
    normalizedTime
  );

  if (exists) {
    throw new Error("Slot already booked for this time");
  }

  return await appointmentRepo.createAppointment({
    ...data,
    date: normalizedDate,
    time: normalizedTime,
  });
};

// Get appointments
export const GetAppointments = async (data: UserType) => {
  return await appointmentRepo.getAppointments(data.id, data.role);
};

// Cancel appointment
export const CancelAppointment = async (id: number) => {
  const appointment = await appointmentRepo.findAppointmentById(id);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (appointment.status === "Completed") {
    throw new Error("Completed appointment cannot be cancelled");
  }

  if (appointment.status === "Rejected") {
    throw new Error("Appointment already cancelled");
  }

  await appointmentRepo.updateStatus(id, "Rejected");

  return { message: "Cancelled successfully" };
};

// Update appointment status
export const UpdateStatus = async (id: number, status: AppointmentStatus) => {
  const allowedStatuses: AppointmentStatus[] = [
    "Pending",
    "Accepted",
    "Rejected",
    "Completed",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid status");
  }

  const appointment = await appointmentRepo.findAppointmentById(id);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (appointment.status === "Rejected") {
    throw new Error("Rejected appointment cannot be updated");
  }

  if (appointment.status === "Completed") {
    throw new Error("Completed appointment cannot be updated");
  }

  if (
    appointment.status === "Pending" &&
    !["Accepted", "Rejected"].includes(status)
  ) {
    throw new Error("Pending appointment can only be Accepted or Rejected");
  }

  if (appointment.status === "Accepted" && status !== "Completed") {
    throw new Error("Accepted appointment can only be marked as Completed");
  }

  await appointmentRepo.updateStatus(id, status);

  return { message: "Status updated successfully" };
};

// Doctor dashboard
export const GetDoctorDashboard = async (doctorId: number) => {
  const appointments = await appointmentRepo.getAppointments(doctorId, "Doctor");

  const doctor = await Doctor.findByPk(doctorId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const completedCount = appointments.filter(
    (a) => a.status === "Completed"
  ).length;

  const stats = {
    pending: appointments.filter((a) => a.status === "Pending").length,
    completed: completedCount,
    rejected: appointments.filter((a) => a.status === "Rejected").length,
    earnings: completedCount * Number(doctor.fees || 0),
  };

  return {
    stats,
    appointments,
  };
};