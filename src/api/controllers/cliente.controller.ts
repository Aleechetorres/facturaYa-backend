import { Request, Response, NextFunction } from 'express';
import { ClienteService } from '../../services/cliente.service.js';
import { createClienteDto, updateClienteDto } from '../../dtos/cliente.dto.js';

export class ClienteController {

  static async getAllClientes(req: Request, res: Response, next: NextFunction) {
    try {
      const clientes = await ClienteService.findAll();

      res.status(200).json({
        success: true,
        message: 'Clientes obtenidos exitosamente',
        data: clientes
      });
    } catch (error) {
      next(error);
    }
  }

  static async getClienteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const cliente = await ClienteService.findById(id);

      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: 'Cliente no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Cliente obtenido exitosamente',
        data: cliente
      });
    } catch (error) {
      next(error);
    }
  }

  static async createCliente(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = createClienteDto.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          error: error.details[0].message
        });
      }

      const existingCliente = await ClienteService.findByDocumento(value.numeroDocumento);
      if (existingCliente) {
        return res.status(409).json({
          success: false,
          message: 'Ya existe un cliente con ese número de documento'
        });
      }

      const newCliente = await ClienteService.create(value);

      res.status(201).json({
        success: true,
        message: 'Cliente creado exitosamente',
        data: {
          nombre: newCliente?.nombre,
          numeroDocumento: newCliente?.numeroDocumento
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCliente(req: Request, res: Response, next: NextFunction) {
    try {
      const { documento } = req.params;

      const { error, value } = updateClienteDto.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          error: error.details[0].message
        });
      }

      const existingCliente = await ClienteService.findByDocumento(documento);
      if (!existingCliente) {
        return res.status(404).json({
          success: false,
          message: 'Cliente no encontrado'
        });
      }

      const updatedCliente = await ClienteService.updateById(existingCliente._id, value);

      res.status(200).json({
        success: true,
        message: 'Cliente actualizado exitosamente',
        data: updatedCliente
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateClienteStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { activo } = req.body;

      if (typeof activo !== 'boolean') {
        return res.status(400).json({
          success: false,
          message: 'El campo activo debe ser true o false'
        });
      }

      const currentCliente = await ClienteService.findById(id);
      if (!currentCliente) {
        return res.status(404).json({
          success: false,
          message: 'Cliente no encontrado'
        });
      }

      const updatedCliente = await ClienteService.updateById(id, { activo });

      res.status(200).json({
        success: true,
        message: `Cliente ${activo ? 'activado' : 'desactivado'} exitosamente`,
        data: updatedCliente
      });
    } catch (error) {
      next(error);
    }
  }
}