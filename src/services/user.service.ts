import { Connection, connections, Error, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../config/index.js';
import { IUser } from '../types/user.types.js';
import { userSchema } from '../schemas/users.schema.js';

interface CreateUserData {
  email: string;
  password: string;
  nombre: string;
}

interface UpdateUserData {
  email?: string;
  nombre?: string;
  activo?: boolean;
}

export class UserService {
  private static db: Connection | undefined = connections[0];
  private static model: Model<IUser> | null = null;

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

  static findByEmail(email: string, projection = {}) {
    this.createModel();
    if (this.model) {
      return this.model.findOne({ email, activo: true }, projection);
    }
    return;
  }

  static async create(userData: CreateUserData) {
    this.createModel();
    if (this.model) {
      userData.password = await bcrypt.hash(userData.password, 10);
      return this.model.create(userData);
    }
    return;
  }

  static updateById(id: string, update: UpdateUserData = {}) {
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
      let user = await this.model.findById(id).lean();
      return user ? true : false;
    }
    return;
  }

  static async validateCredentials(email: string, password: string) {
    this.createModel();
    if (this.model) {
      const user = await this.model.findOne({ email, activo: true });
      if (user && await bcrypt.compare(password, user.password)) {
        return user;
      }
    }
    return null;
  }


  private static createModel() {
    this.validateConnection();
    if (!this.model) {
      this.model = this.db === undefined ? null : this.db.model<IUser>('usuarios', userSchema);
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