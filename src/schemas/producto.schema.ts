import { Schema } from 'mongoose';
import { IProducto } from '../types/producto.type.js';

export const productoSchema = new Schema<IProducto>(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      required: true,
      trim: true
    },
    categoriaId: {
      type: Schema.Types.ObjectId,
      ref: 'Categoria',
      required: true
    },
    precio: {
      type: Number,
      required: true,
      min: 0
    },
    impuestos: [{
      iva: {
        type: Number,
        required: true,
        default: 0
      },
      impuestoConsumo: {
        type: Number,
        required: true,
        default: 0
      },
      retencionFuente: {
        type: Number,
        required: true,
        default: 0
      }
    }],
    activo: {
      type: Boolean,
      default: true
    }
  },
  {
    collection: 'productos',
    timestamps: true,
    versionKey: false
  }
);