import { Connection, connections, Error, Model } from 'mongoose';
import { ICliente } from '../types/cliente.types.js';
import { clienteSchema } from '../schemas/cliente.schema.js';

interface CreateClienteData {
  tipoDocumento: 'CC' | 'NIT';
  numeroDocumento: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
}

interface UpdateClienteData {
  tipoDocumento?: 'CC' | 'NIT';
  numeroDocumento?: string;
  nombre?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
  activo?: boolean;
}

export class ClienteService {
  private static db: Connection | undefined = connections[0];
  private static model: Model<ICliente> | null = null;

  constructor() {}

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

  static findByDocumento(numeroDocumento: string, projection = {}) {
    this.createModel();
    if (this.model) {
      return this.model.findOne({ numeroDocumento, activo: true }, projection);
    }
    return;
  }

  static async create(clienteData: CreateClienteData) {
    this.createModel();
    if (this.model) {
      return this.model.create(clienteData);
    }
    return;
  }

  static updateById(id: string, update: UpdateClienteData = {}) {
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

  static async exists(id: string) {
    this.createModel();
    if (this.model) {
      let cliente = await this.model.findById(id).lean();
      return cliente ? true : false;
    }
    return;
  }

  private static createModel() {
    this.validateConnection();
    if (!this.model) {
      this.model = this.db === undefined ? null : this.db.model<ICliente>('clientes', clienteSchema);
    }
    if (!this.model) {
      throw new Error('Database not connected');
    }
  }

  private static validateConnection() {
    if (!this.db) {
      this.db = connections[0];
    }
  }
}