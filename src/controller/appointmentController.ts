import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as appointmentService from "../services/appointmentServices.js";
import type { AuthRequest } from "../types/authRequest.js";
import { Appointment } from "../models/appointment.js";
import { Doctor } from "../models/doctor.js";
import { Patient } from "../models/patient.js";

// Book appointment
export const book = asyncHandler(async (req: AuthRequest, res: Response) => {
  console.log("BOOK req.user:", req.user);
  console.log("BOOK req.body:", req.body);

  const result = await appointmentService.BookAppointment({
    ...req.body,
    patientId: req.user!.id,
  });

  return res.json(result);
});

// Get all appointments
export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
  console.log("GET ALL req.user:", req.user);

  const result = await appointmentService.GetAppointments({
    id: req.user!.id,
    role: req.user!.role,
  });

  return res.json(result);
});

// Cancel appointment
export const cancel = asyncHandler(async (req: Request, res: Response) => {
  const result = await appointmentService.CancelAppointment(Number(req.params.id));
  return res.json(result);
});

// Update appointment status
export const update = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;

  const result = await appointmentService.UpdateStatus(
    Number(req.params.id),
    status
  );

  return res.json(result);
});

// Doctor dashboard
export const doctorDashboard = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const doctorId = req.user!.id;

    const result = await appointmentService.GetDoctorDashboard(doctorId);

    return res.json(result);
  }
);

// Get doctor appointments
export const getDoctorAppointments = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const doctorId = req.user!.id;

    const appointments = await Appointment.findAll({
      where: { doctorId },
      include: [{ model: Patient }],
      order: [["createdAt", "DESC"]],
    });

    return res.json(appointments);
  }
);

// Get doctor slots
export const getDoctorSlots = asyncHandler(async (req: Request, res: Response) => {
  const doctor = await Doctor.findByPk(Number(req.params.id));

  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  const slots = doctor.slots as string[];
  const result: any[] = [];

  for (let i = 0; i < 7; i++) {
    const daySlots: any[] = [];

    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + i);

    for (const time of slots) {
      daySlots.push({
        datetime: new Date(date),
        time,
      });
    }

    result.push(daySlots);
  }

  return res.json(result);
});

// Update doctor profile
export const updateDoctorProfile = asyncHandler(async (req: AuthRequest, res) => {
  const doctorId = req.user!.id;
  const { name, email, specialization, experience, fees } = req.body;

  let imagePath = undefined;

  if (req.file) {
    imagePath = `/uploads/${req.file.filename}`;
  }

  await Doctor.update(
    {
      name,
      email,
      specialization,
      experience,
      fees,
      ...(imagePath && { image: imagePath }),
    },
    { where: { id: doctorId } }
  );

  const updatedDoctor = await Doctor.findByPk(doctorId);

  return res.json(updatedDoctor);
});

// GET Doctor Profile
export const getDoctorProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const doctorId = req.user!.id;

  const doctor = await Doctor.findByPk(doctorId, {
    attributes: ["name", "email", "specialization", "experience", "fees"]
  });

  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  res.json(doctor);
});

// Get total appointments count for patient
export const getMyAppointmentCount = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const patientId = req.user!.id;

    const count = await Appointment.count({
      where: { patientId },
    });

    return res.json({ totalAppointments: count });
  }
);