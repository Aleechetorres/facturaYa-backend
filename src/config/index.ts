import { config } from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

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