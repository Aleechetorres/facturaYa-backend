import { Connection, Model, connections } from 'mongoose';
import { IFactura } from '../types/factura.types.js';
import { facturaSchema } from '../schemas/factura.schema.js';

interface CreateFacturaItem {
  productoId: string;
  cantidad: number;
}

interface CreateFacturaData {
  clienteId: string;
  items: CreateFacturaItem[];
  fecha?: Date;
}

interface FacturaCalculations {
  items: Array<{
    productoId: string;
    cantidad: number;
    precio: number;
    total: number;
  }>;
  subtotal: number;
  iva: number;
  total: number;
}

export class FacturaService {
  private static db: Connection | undefined = connections[0];
  private static model: Model<IFactura> | null = null;

  constructor() {}

  private static createModel() {
    if (!this.model && this.db) {
      this.model = this.db.model<IFactura>('Factura', facturaSchema);
    }
  }

  static async getNextConsecutivo(): Promise<number> {
    this.createModel();
    if (this.model) {
      const lastFactura = await this.model.findOne().sort({ consecutivo: -1 });
      return lastFactura ? lastFactura.consecutivo + 1 : 1001;
    }
    return 1001;
  }

  static async findAll(filters: any = {}, projection = {}) {
    this.createModel();
    if (this.model) {
      return this.model
        .find(filters, projection)
        .populate('clienteId', 'nombre email tipoDocumento numeroDocumento')
        .populate('items.productoId', 'codigo nombre precio')
        .sort({ fecha: -1 });
    }
    return;
  }

  static async findById(id: string, projection = {}) {
    this.createModel();
    if (this.model) {
      return this.model
        .findById(id, projection)
        .populate('clienteId', 'nombre email tipoDocumento numeroDocumento telefono direccion ciudad')
        .populate('items.productoId', 'codigo nombre descripcion precio');
    }
    return;
  }

  static async findByConsecutivo(consecutivo: number, projection = {}) {
    this.createModel();
    if (this.model) {
      return this.model
        .findOne({ consecutivo }, projection)
        .populate('clienteId', 'nombre email tipoDocumento numeroDocumento telefono direccion ciudad')
        .populate('items.productoId', 'codigo nombre descripcion precio');
    }
    return;
  }

  static async findByCliente(clienteId: string, projection = {}) {
    this.createModel();
    if (this.model) {
      return this.model
        .find({ clienteId }, projection)
        .populate('clienteId', 'nombre email')
        .populate('items.productoId', 'codigo nombre precio')
        .sort({ fecha: -1 });
    }
    return;
  }

  static async create(facturaData: CreateFacturaData, calculations: FacturaCalculations) {
    this.createModel();
    if (this.model) {
      const consecutivo = await this.getNextConsecutivo();
      
      const factura = {
        consecutivo,
        fecha: facturaData.fecha || new Date(),
        clienteId: facturaData.clienteId,
        items: calculations.items,
        subtotal: calculations.subtotal,
        iva: calculations.iva,
        total: calculations.total,
        estado: 'EMITIDA'
      };

      return this.model.create(factura);
    }
    return;
  }

  static async updateEstado(id: string, estado: 'EMITIDA' | 'ANULADA' | 'PAGADA') {
    this.createModel();
    if (this.model) {
      return this.model
        .findByIdAndUpdate(id, { estado }, { new: true })
        .populate('clienteId', 'nombre email tipoDocumento numeroDocumento')
        .populate('items.productoId', 'codigo nombre precio');
    }
    return;
  }

  static async getEstadisticas() {
    this.createModel();
    if (this.model) {
      const stats = await this.model.aggregate([
        {
          $group: {
            _id: '$estado',
            count: { $sum: 1 },
            totalMonto: { $sum: '$total' }
          }
        }
      ]);

      const totalFacturas = await this.model.countDocuments();
      const totalVentas = await this.model.aggregate([
        { $match: { estado: { $ne: 'ANULADA' } } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]);

      return {
        totalFacturas,
        totalVentas: totalVentas[0]?.total || 0,
        porEstado: stats
      };
    }
    return null;
  }
}