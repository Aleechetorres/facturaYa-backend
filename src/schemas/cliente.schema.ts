import { Schema } from 'mongoose';

export const clienteSchema = new Schema({
  tipoDocumento: {
    type: String,
    enum: ['CC', 'NIT'],
    required: true
  },
  numeroDocumento: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  telefono: {
    type: String,
    required: true,
    trim: true
  },
  direccion: {
    type: String,
    required: true,
    trim: true
  },
  ciudad: {
    type: String,
    required: true,
    trim: true
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  collection: 'clientes',
  versionKey: false,
  timestamps: true
});