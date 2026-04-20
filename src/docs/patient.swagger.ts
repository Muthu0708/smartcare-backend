/**
 * @swagger
 * tags:
 *   name: Patient
 *   description: Patient APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PatientRegister:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           example: Patient
 *
 *     BookAppointment:
 *       type: object
 *       required:
 *         - doctorId
 *         - date
 *         - time
 *       properties:
 *         doctorId:
 *           type: integer
 *         date:
 *           type: string
 *           example: 2026-04-18
 *         time:
 *           type: string
 *           example: 10:00:00
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new patient
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Muthu Kumar
 *               email:
 *                 type: string
 *                 example: muthu@gmail.com
 *               password:
 *                 type: string
 *                 example: Muthu@123
 *               role:
 *                 type: string
 *                 enum: [Patient, Doctor]
 *                 example: Patient
 *     responses:
 *       201:
 *         description: User Registered Successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login patient or doctor
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: richard@gmail.com
 *               password:
 *                 type: string
 *                 example: Richard@12345
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     security: []
 *     responses:
 *       200:
 *         description: Token refreshed
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Book an appointment
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctorId
 *               - date
 *               - time
 *             properties:
 *               doctorId:
 *                 type: integer
 *                 example: 1
 *               date:
 *                 type: string
 *                 example: 2026-04-18
 *               time:
 *                 type: string
 *                 example: 10:00:00
 *     responses:
 *       200:
 *         description: Appointment booked successfully
 *       400:
 *         description: Validation error or slot already booked
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get My Appointments
 *     tags: [Patient]
 *     responses:
 *       200:
 *         description: List of appointments
 */

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Cancel appointment
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cancelled successfully
 */