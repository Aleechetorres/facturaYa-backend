import { Schema } from 'mongoose';

export const usuariosSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  activo: {
    type: Boolean,
    default: true,
  },
}, {
  collection: 'usuarios',
  versionKey: false,
  timestamps: true
})