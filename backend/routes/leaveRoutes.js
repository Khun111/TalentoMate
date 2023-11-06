import { Router } from 'express';
import LeaveController from '../controllers/LeaveController';
const router = Router();

/**
 * Middleware to verify admin status
 */
// const isAdmin = (req, res, next) => {
//     const { role } = req.body;
//     if (role === 'admin') next()
//     else res.status(403).json({ error: 'Unauthorized' });
// }

router.post('/leave', LeaveController.create)
router.put('/leave', LeaveController.update)
router.get('/leave/:id', LeaveController.read)
router.delete('/leave/:id', LeaveController.deleteOne)

export default router;