import { Router } from 'express';
import EmployeeController from './EmployeeController';
const router = Router();

/**
 * Middleware to verify admin status
 */
// const isAdmin = (req, res, next) => {
//     const { role } = req.body;
//     if (role === 'admin') next()
//     else res.status(403).json({ error: 'Unauthorized' });
// }

router.post('/employee', EmployeeController.create)
router.put('/employee/:id', EmployeeController.update)
router.get('/employee', EmployeeController.readAll)
router.get('/employee/:id', EmployeeController.readOne)
router.delete('/employee/:id', EmployeeController.delete)

export default router;