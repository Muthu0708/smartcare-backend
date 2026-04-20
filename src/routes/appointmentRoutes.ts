import express from 'express';
import * as appointmentController from '../controller/appointmentController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from "../middlewares/upload.js"

const router=express.Router();

//Book the appoitmnet
router.post('/',protect,appointmentController.book);
//get the appointment for that patient
router.get('/',protect,appointmentController.getAll);
//cancel the appointment
router.delete('/:id',protect,appointmentController.cancel);
//update the status
router.patch('/:id/status', protect, appointmentController.update);
router.get("/doctor/:id/slots", protect, appointmentController.getDoctorSlots);
router.get("/my/count", protect, appointmentController.getMyAppointmentCount);
router.get('/doctor/dashboard', protect, appointmentController.doctorDashboard);
router.get("/doctor", protect, appointmentController.getDoctorAppointments);
router.patch("/doctor/profile", protect, upload.single("image"), appointmentController.updateDoctorProfile);
router.get("/doctor/profile", protect, appointmentController.getDoctorProfile);

export default router;