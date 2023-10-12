import { Router } from 'express';
import AuthController from '../controllers/AuthController';
const router = Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/forgotPassword', AuthController.forgotPassword);
router.post('/resetPassword/:token', AuthController.resetPassword);

export default router;