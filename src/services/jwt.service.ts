import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { IUser } from '../types/user.types.js';

export class JwtService {

  static generateToken(user: IUser): string {
    const payload = {
      id: user._id,
      email: user.email,
      nombre: user.nombre
    };

    const secret = config.jwt.secret as string;
    const expiration = config.jwt.expiration as string;

    return jwt.sign(payload, secret, {
      expiresIn: expiration,
      issuer: 'FacturaYa'
    });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, config.jwt.secret as string);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  static decodeToken(token: string): any {
    return jwt.decode(token);
  }
}