import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../services/user.service.js';
import { JwtService } from '../../services/jwt.service.js';
import { createUserDto, updateUserDto, loginUserDto } from '../../dtos/user.dto.js';

export class UserController {

  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.findAll({ password: 0 });

      res.status(200).json({
        success: true,
        message: 'Usuarios obtenidos exitosamente',
        data: users
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserService.findById(id, { password: 0 });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Usuario obtenido exitosamente',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = createUserDto.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          error: error.details[0].message
        });
      }

      const existingUser = await UserService.findByEmail(value.email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'El email ya está registrado'
        });
      }

      const newUser = await UserService.create(value);

      res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        email: newUser?.email
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { error, value } = updateUserDto.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          error: error.details[0].message
        });
      }

      const updatedUser = await UserService.updateById(id, value);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: updatedUser
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUserStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { activo } = req.body;

      if (typeof activo !== 'boolean') {
        return res.status(400).json({
          success: false,
          message: 'El campo activo debe ser true o false'
        });
      }

      const currentUser = await UserService.findById(id);
      if (!currentUser) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      const updatedUser = await UserService.updateById(id, { activo });

      res.status(200).json({
        success: true,
        message: `Usuario ${activo ? 'activado' : 'desactivado'} exitosamente`,
        data: updatedUser
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = loginUserDto.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          error: error.details[0].message
        });
      }

      const user = await UserService.validateCredentials(value.email, value.password);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      const token = JwtService.generateToken(user);

      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: {
          user: {
            email: user.email,
            nombre: user.nombre,
            activo: user.activo
          },
          token: token
        }
      });
    } catch (error) {
      next(error);
    }
  }
}