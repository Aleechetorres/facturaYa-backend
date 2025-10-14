import { config } from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Solo cargar .env si existe (en desarrollo). En producción (Docker/Render) las variables vienen del sistema
config();

export default {
  api: {
    prefix: '/api/v1',
  },
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  port: process.env.PORT || '3000',

  jwt: {
    secret: process.env.JWT_SECRET || 'FACTURA_YA_JWT_SECRET',
    expiration: process.env.JWT_EXPIRATION || '2h'
  }
}