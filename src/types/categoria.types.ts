import { Document } from 'mongoose';

export interface ICategoria extends Document {
  _id: string;
  codigo: string;
  descripcion: string;
  nombre: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}