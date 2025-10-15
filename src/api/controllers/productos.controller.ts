import { Request, Response, NextFunction } from 'express';
import { ProductoService } from '../../services/producto.service.js';
import { CategoriaService } from '../../services/categoria.service.js';
import { createProductoDto, updateProductoDto } from '../../dtos/producto.dto.js';

export class ProductoController {
  static async getAllProductos(req: Request, res: Response, next: NextFunction) {
    try {
      const productos = await ProductoService.findAll();
      res.status(200).json({
        success: true,
        message: 'Productos obtenidos exitosamente',
        data: productos
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductoById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const producto = await ProductoService.findById(id);
      
      if (!producto) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Producto obtenido exitosamente',
        data: producto
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductosByCategoria(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoriaId } = req.params;
      
      // Verificar que la categoría existe
      const categoria = await CategoriaService.findById(categoriaId);
      if (!categoria) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada'
        });
      }

      const productos = await ProductoService.findByCategoria(categoriaId);
      res.status(200).json({
        success: true,
        message: 'Productos obtenidos exitosamente',
        data: productos
      });
    } catch (error) {
      next(error);
    }
  }

  static async createProducto(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = createProductoDto.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          error: error.details[0].message
        });
      }

      // Verificar que el código no exista
      const existingProducto = await ProductoService.findByCodigo(value.codigo);
      if (existingProducto) {
        return res.status(409).json({
          success: false,
          message: 'El código de producto ya está registrado'
        });
      }

      // Verificar que la categoría existe
      const categoria = await CategoriaService.findById(value.categoriaId);
      if (!categoria) {
        return res.status(404).json({
          success: false,
          message: 'La categoría especificada no existe'
        });
      }

      const newProducto = await ProductoService.create(value);
      
      res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        data: newProducto
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProducto(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { error, value } = updateProductoDto.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          error: error.details[0].message
        });
      }

      // Si se está actualizando la categoría, verificar que existe
      if (value.categoriaId) {
        const categoria = await CategoriaService.findById(value.categoriaId);
        if (!categoria) {
          return res.status(404).json({
            success: false,
            message: 'La categoría especificada no existe'
          });
        }
      }

      const updatedProducto = await ProductoService.updateById(id, value);
      
      if (!updatedProducto) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: updatedProducto
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProductoStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { activo } = req.body;

      if (typeof activo !== 'boolean') {
        return res.status(400).json({
          success: false,
          message: 'El campo activo debe ser true o false'
        });
      }

      const currentProducto = await ProductoService.findById(id);
      if (!currentProducto) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      const updatedProducto = await ProductoService.updateById(id, { activo });

      res.status(200).json({
        success: true,
        message: `Producto ${activo ? 'activado' : 'desactivado'} exitosamente`,
        data: updatedProducto
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProducto(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedProducto = await ProductoService.softDelete(id);

      if (!deletedProducto) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Producto eliminado exitosamente (soft delete)',
        data: deletedProducto
      });
    } catch (error) {
      next(error);
    }
  }
}