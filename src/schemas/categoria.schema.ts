import { Schema } from 'mongoose';
import { ICategoria } from '../types/categoria.types.js';

export const categoriaSchema = new Schema<ICategoria>(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    descripcion: {
      type: String,
      required: true,
      trim: true
    },
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    activo: {
      type: Boolean,
      default: true
    }
  },
  {
    collection: 'categorias',
    timestamps: true,
    versionKey: false
  }
);