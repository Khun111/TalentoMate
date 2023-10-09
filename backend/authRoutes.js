import { Router } from 'express';
import AuthController from './AuthController';
const router = Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout/:token', AuthController.logout);
router.post('/forgotPassword', AuthController.forgotPassword);
router.post('/resetPassword/:token', AuthController.resetPassword);

export default router;