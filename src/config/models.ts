import { connections } from 'mongoose';
import { categoriaSchema } from '../schemas/categoria.schema.js';
import { productoSchema } from '../schemas/producto.schema.js';
import { clienteSchema } from '../schemas/cliente.schema.js';
import { facturaSchema } from '../schemas/factura.schema.js';
import { usuariosSchema } from '../schemas/users.schema.js'; // Si tienes el schema de usuarios

export const initModels = () => {
  const db = connections[0];
  
  if (db) {
    // Registrar todos los modelos
    db.model('User', usuariosSchema);        // O el nombre que uses
    db.model('Categoria', categoriaSchema);
    db.model('Producto', productoSchema);
    db.model('Cliente', clienteSchema);
    db.model('Factura', facturaSchema);
    
    console.log('✅ Modelos registrados exitosamente');
  }
};