export interface IUser {
  _id: string;
  email: string;
  password: string;
  nombre: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserData {
  email?: string;
  nombre?: string;
  activo?: boolean;
}