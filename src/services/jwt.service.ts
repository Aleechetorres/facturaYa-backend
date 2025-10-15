import jwt, { Secret, SignOptions } from 'jsonwebtoken';
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
    const options: SignOptions  = {
      expiresIn: config.jwt.expiration as any || '2h',
      issuer: 'FacturaYa'
    };

    return jwt.sign(payload, secret, options);
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