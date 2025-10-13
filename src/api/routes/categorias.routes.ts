import { Router } from 'express';
import { CategoriaController } from '../controllers/categoria.controller.js';

const router = Router();

// Obtener todas las categorías
router.get('/', CategoriaController.getAllCategorias);

// Obtener una categoría por ID
router.get('/:id', CategoriaController.getCategoriaById);

// Crear una nueva categoría
router.post('/', CategoriaController.createCategoria);

// Actualizar una categoría
router.put('/:id', CategoriaController.updateCategoria);

// Actualizar estado de una categoría (activar/desactivar)
router.patch('/:id/status', CategoriaController.updateCategoriaStatus);

// Eliminar una categoría (soft delete)
router.delete('/:id', CategoriaController.deleteCategoria);

export default router;