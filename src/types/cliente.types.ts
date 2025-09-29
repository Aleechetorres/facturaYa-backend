export interface ICliente {
  _id: string;
  tipoDocumento: 'CC' | 'NIT' ;
  numeroDocumento: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}