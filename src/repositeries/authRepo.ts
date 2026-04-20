import { Patient, type PatientCreationAttributes } from "../models/patient.js";
import { Doctor } from "../models/doctor.js";

// Create patient
export const createUser = async (data: PatientCreationAttributes) => {
  return await Patient.create(data);
};

// Find patient by email
export const findPatientByEmail = async (email: string) => {
  return await Patient.findOne({
    where: { email },
  });
};

// Find doctor by email
export const findDoctorByEmail = async (email: string) => {
  return await Doctor.findOne({
    where: { email },
  });
};

// Find patient by id
export const findByPatientId = async (id: number) => {
  return await Patient.findByPk(id);
};

// Update patient refresh token only
export const updatePatientRefreshToken = async (
  userId: number,
  refreshToken: string
) => {
  return await Patient.update(
    { refreshToken },
    { where: { id: userId } }
  );
};

// Remove patient refresh token only
export const removePatientRefreshToken = async (userId: number) => {
  return await Patient.update(
    { refreshToken: null },
    { where: { id: userId } }
  );
};