/**
 * @swagger
 * tags:
 *   name: Doctor
 *   description: Doctor APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateStatus:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [Accepted, Rejected, Completed]
 *
 *     DoctorProfile:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         specialization:
 *           type: string
 *         experience:
 *           type: string
 *         fees:
 *           type: number
 *         image:
 *           type: string
 *           format: binary
 */

/**
 * @swagger
 * /api/appointments/doctor:
 *   get:
 *     summary: Get Doctor Appointments
 *     tags: [Doctor]
 *     responses:
 *       200:
 *         description: Doctor appointments list
 */

/**
 * @swagger
 * /api/appointments/{id}/status:
 *   patch:
 *     summary: Update appointment status
 *     tags: [Doctor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Accepted, Rejected, Completed]
 *     responses:
 *       200:
 *         description: Status updated
 */

/**
 * @swagger
 * /api/appointments/doctor/dashboard:
 *   get:
 *     summary: Doctor Dashboard
 *     tags: [Doctor]
 *     responses:
 *       200:
 *         description: Dashboard data
 */

/**
 * @swagger
 * /api/appointments/doctor/{id}/slots:
 *   get:
 *     summary: Get doctor slots
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor slots fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     datetime:
 *                       type: string
 *                       example: 2026-04-18T00:00:00.000Z
 *                     time:
 *                       type: string
 *                       example: 10:00
 *       404:
 *         description: Doctor not found
 */

/**
 * @swagger
 * /api/appointments/doctor/profile:
 *   get:
 *     summary: Get Doctor Profile
 *     tags: [Doctor]
 *     responses:
 *       200:
 *         description: Doctor profile
 */

/**
 * /**
 * @swagger
 * /api/appointments/doctor/profile:
 *   patch:
 *     summary: Update Doctor Profile
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               specialization:
 *                 type: string
 *               experience:
 *                 type: string
 *               fees:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated
 */