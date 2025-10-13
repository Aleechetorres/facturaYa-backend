import { Router } from 'express';
import { ProductoController } from '../controllers/productos.controller';

const router = Router();

// Obtener todos los productos
router.get('/', ProductoController.getAllProductos);

// Obtener productos por categoría
router.get('/categoria/:categoriaId', ProductoController.getProductosByCategoria);

// Obtener un producto por ID
router.get('/:id', ProductoController.getProductoById);

// Crear un nuevo producto
router.post('/', ProductoController.createProducto);

// Actualizar un producto
router.put('/:id', ProductoController.updateProducto);

// Actualizar estado de un producto (activar/desactivar)
router.patch('/:id/status', ProductoController.updateProductoStatus);

// Eliminar un producto (soft delete)
router.delete('/:id', ProductoController.deleteProducto);

export default router;