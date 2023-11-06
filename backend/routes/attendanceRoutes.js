import { Router } from 'express';
import AttendanceController from '../controllers/AttendanceController';
const router = Router();

/**
 * Middleware to verify admin status
 */
// const isAdmin = (req, res, next) => {
//     const { role } = req.body;
//     if (role === 'admin') next()
//     else res.status(403).json({ error: 'Unauthorized' });
// }

router.post('/attendance', AttendanceController.create)
router.put('/attendance', AttendanceController.update)
router.get('/attendance/:id', AttendanceController.read)
router.delete('/attendance/:id', AttendanceController.deleteOne)

export default router;