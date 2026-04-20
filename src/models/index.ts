import { Patient } from "./patient.js";
import { Doctor } from "./doctor.js";
import { Appointment } from "./appointment.js";


Patient.hasMany(Appointment, { foreignKey: "patientId" });
Appointment.belongsTo(Patient, { foreignKey: "patientId" });

Doctor.hasMany(Appointment, { foreignKey: "doctorId" });
Appointment.belongsTo(Doctor, { foreignKey: "doctorId"});

export { Patient, Doctor, Appointment };