import { Request, Response, NextFunction } from 'express';
import { CategoriaService } from '../../services/categoria.service.js';
import { createCategoriaDto, updateCategoriaDto } from '../../dtos/categoria.dto.js';

export class CategoriaController {
  static async getAllCategorias(req: Request, res: Response, next: NextFunction) {
    try {
      const categorias = await CategoriaService.findAll();
      res.status(200).json({
        success: true,
        message: 'Categorías obtenidas exitosamente',
        data: categorias
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategoriaById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const categoria = await CategoriaService.findById(id);
      
      if (!categoria) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Categoría obtenida exitosamente',
        data: categoria
      });
    } catch (error) {
      next(error);
    }
  }

  static async createCategoria(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = createCategoriaDto.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          error: error.details[0].message
        });
      }

      const existingCategoria = await CategoriaService.findByCodigo(value.codigo);
      if (existingCategoria) {
        return res.status(409).json({
          success: false,
          message: 'El código de categoría ya está registrado'
        });
      }

      const newCategoria = await CategoriaService.create(value);
      
      res.status(201).json({
        success: true,
        message: 'Categoría creada exitosamente',
        data: newCategoria
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategoria(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { error, value } = updateCategoriaDto.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          error: error.details[0].message
        });
      }

      const updatedCategoria = await CategoriaService.updateById(id, value);
      
      if (!updatedCategoria) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Categoría actualizada exitosamente',
        data: updatedCategoria
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategoriaStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { activo } = req.body;

      if (typeof activo !== 'boolean') {
        return res.status(400).json({
          success: false,
          message: 'El campo activo debe ser true o false'
        });
      }

      const currentCategoria = await CategoriaService.findById(id);
      if (!currentCategoria) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada'
        });
      }

      const updatedCategoria = await CategoriaService.updateById(id, { activo });

      res.status(200).json({
        success: true,
        message: `Categoría ${activo ? 'activada' : 'desactivada'} exitosamente`,
        data: updatedCategoria
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategoria(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedCategoria = await CategoriaService.softDelete(id);

      if (!deletedCategoria) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Categoría eliminada exitosamente (soft delete)',
        data: deletedCategoria
      });
    } catch (error) {
      next(error);
    }
  }
}