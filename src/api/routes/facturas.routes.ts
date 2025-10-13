import { Router } from 'express';
import { FacturaController } from '../controllers/factura.controller.js';

const router = Router();

// Obtener estadísticas de facturación
router.get('/estadisticas', FacturaController.getEstadisticas);

// Obtener todas las facturas (con filtros opcionales: ?estado=EMITIDA&clienteId=...)
router.get('/', FacturaController.getAllFacturas);

// Obtener factura por consecutivo
router.get('/consecutivo/:consecutivo', FacturaController.getFacturaByConsecutivo);

// Obtener facturas por cliente
router.get('/cliente/:clienteId', FacturaController.getFacturasByCliente);

// Obtener una factura por ID
router.get('/:id', FacturaController.getFacturaById);

// Crear una nueva factura
router.post('/', FacturaController.createFactura);

// Actualizar estado de una factura (EMITIDA -> PAGADA o ANULADA)
router.patch('/:id/estado', FacturaController.updateEstadoFactura);

export default router;