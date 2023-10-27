import { Router } from 'express';
import AuthController from '../controllers/AuthController';
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization
 */



/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               job:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User account created successfully
 *       401:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post('/signup', AuthController.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in and obtain an authentication token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful
 *       404:
 *         description: User not found
 *       403:
 *         description: Password mismatch
 *       500:
 *         description: Server error
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out and invalidate the authentication token
 *     tags: [Authentication]
 *     responses:
 *       204:
 *         description: Token invalidated
 *       400:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/logout', AuthController.logout);

/**
 * @swagger
 * /forgotPassword:
 *   post:
 *     summary: Send a password reset link to the user's email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       401:
 *         description: Email not found
 *       500:
 *         description: Server error
 */
router.post('/forgotPassword', AuthController.forgotPassword);

/**
 * @swagger
 * /resetPassword/{token}:
 *   post:
 *     summary: Reset the user's password using a token
 *     tags: [Authentication]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       500:
 *         description: Server error
 */
router.post('/resetPassword/:token', AuthController.resetPassword);

export default router;