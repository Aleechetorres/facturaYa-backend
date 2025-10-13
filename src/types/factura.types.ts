import { Document, Types } from 'mongoose';

export interface IFacturaItem {
  productoId: Types.ObjectId;
  cantidad: number;
  precio: number;
  total: number;
}

export interface IFactura extends Document {
  _id: string;
  consecutivo: number;
  fecha: Date;
  clienteId: Types.ObjectId;
  items: IFacturaItem[];
  subtotal: number;
  iva: number;
  total: number;
  estado: 'EMITIDA' | 'ANULADA' | 'PAGADA';
  createdAt: Date;
  updatedAt: Date;
}