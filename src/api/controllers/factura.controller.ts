import { Request, Response, NextFunction } from 'express';
import { FacturaService } from '../../services/factura.service.js';
import { ClienteService } from '../../services/cliente.service.js';
import { ProductoService } from '../../services/producto.service.js';
import { createFacturaDto, updateEstadoFacturaDto } from '../../dtos/factura.dto.js';

export class FacturaController {
  
  // Obtener todas las facturas con filtros opcionales
  static async getAllFacturas(req: Request, res: Response, next: NextFunction) {
    try {
      const { estado, clienteId } = req.query;
      const filters: any = {};

      if (estado) filters.estado = estado;
      if (clienteId) filters.clienteId = clienteId;

      const facturas = await FacturaService.findAll(filters);
      
      res.status(200).json({
        success: true,
        message: 'Facturas obtenidas exitosamente',
        data: facturas
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener factura por ID
  static async getFacturaById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const factura = await FacturaService.findById(id);
      
      if (!factura) {
        return res.status(404).json({
          success: false,
          message: 'Factura no encontrada'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Factura obtenida exitosamente',
        data: factura
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener factura por consecutivo
  static async getFacturaByConsecutivo(req: Request, res: Response, next: NextFunction) {
    try {
      const { consecutivo } = req.params;
      const factura = await FacturaService.findByConsecutivo(Number(consecutivo));
      
      if (!factura) {
        return res.status(404).json({
          success: false,
          message: 'Factura no encontrada'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Factura obtenida exitosamente',
        data: factura
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener facturas de un cliente
  static async getFacturasByCliente(req: Request, res: Response, next: NextFunction) {
    try {
      const { clienteId } = req.params;
      
      // Verificar que el cliente existe
      const cliente = await ClienteService.findById(clienteId);
      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: 'Cliente no encontrado'
        });
      }

      const facturas = await FacturaService.findByCliente(clienteId);
      
      res.status(200).json({
        success: true,
        message: 'Facturas del cliente obtenidas exitosamente',
        data: facturas
      });
    } catch (error) {
      next(error);
    }
  }

  // Crear nueva factura
  static async createFactura(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = createFacturaDto.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          error: error.details[0].message
        });
      }

      // Validar que el cliente existe y está activo
      const cliente = await ClienteService.findById(value.clienteId);
      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: 'Cliente no encontrado'
        });
      }

      if (!cliente.activo) {
        return res.status(400).json({
          success: false,
          message: 'El cliente está inactivo'
        });
      }

      // Validar productos y calcular totales
      const itemsCalculados = [];
      let subtotal = 0;
      let ivaTotal = 0;

      for (const item of value.items) {
        const producto = await ProductoService.findById(item.productoId);
        
        if (!producto) {
          return res.status(404).json({
            success: false,
            message: `Producto con ID ${item.productoId} no encontrado`
          });
        }

        if (!producto.activo) {
          return res.status(400).json({
            success: false,
            message: `El producto "${producto.nombre}" está inactivo`
          });
        }

        // Calcular totales del item
        const precioUnitario = producto.precio;
        const totalItem = precioUnitario * item.cantidad;
        
        // Calcular IVA del item (asumiendo primer impuesto)
        const ivaProducto = producto.impuestos[0]?.iva || 0;
        const ivaItem = (totalItem * ivaProducto) / 100;

        itemsCalculados.push({
          productoId: item.productoId,
          cantidad: item.cantidad,
          precio: precioUnitario,
          total: totalItem
        });

        subtotal += totalItem;
        ivaTotal += ivaItem;
      }

      const total = subtotal + ivaTotal;

      // Crear la factura
      const nuevaFactura = await FacturaService.create(value, {
        items: itemsCalculados,
        subtotal: Math.round(subtotal * 100) / 100,
        iva: Math.round(ivaTotal * 100) / 100,
        total: Math.round(total * 100) / 100
      });

      // Obtener factura completa con populate
      const facturaCompleta = await FacturaService.findById(nuevaFactura!._id);

      res.status(201).json({
        success: true,
        message: 'Factura creada exitosamente',
        data: facturaCompleta
      });
    } catch (error) {
      next(error);
    }
  }

  // Actualizar estado de factura
  static async updateEstadoFactura(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { error, value } = updateEstadoFacturaDto.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          error: error.details[0].message
        });
      }

      const facturaActual = await FacturaService.findById(id);
      if (!facturaActual) {
        return res.status(404).json({
          success: false,
          message: 'Factura no encontrada'
        });
      }

      // Validaciones de cambio de estado
      if (facturaActual.estado === 'ANULADA') {
        return res.status(400).json({
          success: false,
          message: 'No se puede modificar una factura anulada'
        });
      }

      if (facturaActual.estado === 'PAGADA' && value.estado === 'EMITIDA') {
        return res.status(400).json({
          success: false,
          message: 'No se puede cambiar una factura pagada a emitida'
        });
      }

      const facturaActualizada = await FacturaService.updateEstado(id, value.estado);

      res.status(200).json({
        success: true,
        message: `Factura ${value.estado.toLowerCase()} exitosamente`,
        data: facturaActualizada
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener estadísticas de facturación
  static async getEstadisticas(req: Request, res: Response, next: NextFunction) {
    try {
      const estadisticas = await FacturaService.getEstadisticas();
      
      res.status(200).json({
        success: true,
        message: 'Estadísticas obtenidas exitosamente',
        data: estadisticas
      });
    } catch (error) {
      next(error);
    }
  }
}