import { Connection, Model, connections } from 'mongoose';
import { IProducto } from '../types/producto.type.js';
import { productoSchema } from '../schemas/producto.schema.js';

interface CreateProductoData {
  codigo: string;
  nombre: string;
  descripcion: string;
  categoriaId: string;
  precio: number;
  impuestos: Array<{
    iva: number;
    impuestoConsumo: number;
    retencionFuente: number;
  }>;
}

interface UpdateProductoData {
  codigo?: string;
  nombre?: string;
  descripcion?: string;
  categoriaId?: string;
  precio?: number;
  impuestos?: Array<{
    iva: number;
    impuestoConsumo: number;
    retencionFuente: number;
  }>;
  activo?: boolean;
}

export class ProductoService {
  private static db: Connection | undefined = connections[0];
  private static model: Model<IProducto> | null = null;

  constructor() {}

  private static createModel() {
    if (!this.model && this.db) {
      this.model = this.db.model<IProducto>('Producto', productoSchema);
    }
  }

  static async findAll(projection = {}) {
    this.createModel();
    if (this.model) {
      return this.model.find({}, projection).populate('categoriaId', 'codigo nombre descripcion');
    }
    return;
  }

  static async findById(id: string, projection = {}) {
    this.createModel();
    if (this.model) {
      return this.model.findById(id, projection).populate('categoriaId', 'codigo nombre descripcion');
    }
    return;
  }

  static findByCodigo(codigo: string, projection = {}) {
    this.createModel();
    if (this.model) {
      return this.model.findOne({ codigo, activo: true }, projection).populate('categoriaId', 'codigo nombre descripcion');
    }
    return;
  }

  static async findByCategoria(categoriaId: string, projection = {}) {
    this.createModel();
    if (this.model) {
      return this.model.find({ categoriaId, activo: true }, projection).populate('categoriaId', 'codigo nombre descripcion');
    }
    return;
  }

  static async create(productoData: CreateProductoData) {
    this.createModel();
    if (this.model) {
      return this.model.create(productoData);
    }
    return;
  }

  static updateById(id: string, update: UpdateProductoData = {}) {
    this.createModel();
    if (this.model) {
      return this.model.findByIdAndUpdate(id, update, { new: true, runValidators: true }).populate('categoriaId', 'codigo nombre descripcion');
    }
    return;
  }

  static async softDelete(id: string) {
    this.createModel();
    if (this.model) {
      return this.model.findByIdAndUpdate(id, { activo: false }, { new: true }).populate('categoriaId', 'codigo nombre descripcion');
    }
    return;
  }
}