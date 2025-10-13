import { Connection, Model, connections } from 'mongoose';
import { ICategoria } from '../types/categoria.types';
import { categoriaSchema } from '../schemas/categoria.schema.js';

interface CreateCategoriaData {
  codigo: string;
  descripcion: string;
  nombre: string;
}

interface UpdateCategoriaData {
  codigo?: string;
  descripcion?: string;
  nombre?: string;
  activo?: boolean;
}

export class CategoriaService {
  private static db: Connection | undefined = connections[0];
  private static model: Model<ICategoria> | null = null;

  constructor() {}

  private static createModel() {
    if (!this.model && this.db) {
      this.model = this.db.model<ICategoria>('Categoria', categoriaSchema);
    }
  }

  static async findAll(projection = {}) {
    this.createModel();
    if (this.model) {
      return this.model.find({}, projection);
    }
    return;
  }

  static findById(id: string, projection = {}) {
    this.createModel();
    if (this.model) {
      return this.model.findById(id, projection);
    }
    return;
  }

  static findByCodigo(codigo: string, projection = {}) {
    this.createModel();
    if (this.model) {
      return this.model.findOne({ codigo, activo: true }, projection);
    }
    return;
  }

  static async create(categoriaData: CreateCategoriaData) {
    this.createModel();
    if (this.model) {
      return this.model.create(categoriaData);
    }
    return;
  }

  static updateById(id: string, update: UpdateCategoriaData = {}) {
    this.createModel();
    if (this.model) {
      return this.model.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    }
    return;
  }

  static async softDelete(id: string) {
    this.createModel();
    if (this.model) {
      return this.model.findByIdAndUpdate(id, { activo: false }, { new: true });
    }
    return;
  }

  static async validateCredentials(codigo: string) {
    const categoria = await this.findByCodigo(codigo);
    if (!categoria) {
      return null;
    }
    return categoria;
  }
}