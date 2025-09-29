import { Router } from 'express';
import { ClienteController } from '../controllers/cliente.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', ClienteController.getAllClientes);
router.post('/', ClienteController.createCliente);
router.patch('/:documento', ClienteController.updateCliente);
router.patch('/:id/status', ClienteController.updateClienteStatus);

export default router;