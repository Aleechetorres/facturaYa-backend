import { Schema } from 'mongoose';
import { IFactura } from '../types/factura.types.js';

export const facturaSchema = new Schema<IFactura>(
  {
    consecutivo: {
      type: Number,
      required: true,
      unique: true
    },
    fecha: {
      type: Date,
      required: true,
      default: Date.now
    },
    clienteId: {
      type: Schema.Types.ObjectId,
      ref: 'Cliente',
      required: true
    },
    items: [{
      productoId: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
      },
      cantidad: {
        type: Number,
        required: true,
        min: 1
      },
      precio: {
        type: Number,
        required: true,
        min: 0
      },
      total: {
        type: Number,
        required: true,
        min: 0
      }
    }],
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    iva: {
      type: Number,
      required: true,
      min: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    },
    estado: {
      type: String,
      enum: ['EMITIDA', 'ANULADA', 'PAGADA'],
      default: 'EMITIDA',
      required: true
    }
  },
  {
    collection: 'facturas',
    timestamps: true,
    versionKey: false
  }
);

// Índices para mejorar consultas
facturaSchema.index({ consecutivo: 1 });
facturaSchema.index({ clienteId: 1 });
facturaSchema.index({ fecha: -1 });
facturaSchema.index({ estado: 1 });