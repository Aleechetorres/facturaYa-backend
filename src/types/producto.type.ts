import { Document, Types } from 'mongoose';

export interface IProducto extends Document {
  _id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoriaId: Types.ObjectId;
  precio: number;
  impuestos: Array<{
    iva: number;
    impuestoConsumo: number;
    retencionFuente: number;
  }>;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}