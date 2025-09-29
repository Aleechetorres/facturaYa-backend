import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);
router.patch('/:id/status', UserController.updateUserStatus);

export default router;