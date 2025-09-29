import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';

const router = Router();

router.post('/login', UserController.loginUser);

export default router;