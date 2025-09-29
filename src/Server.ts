import express from 'express';
import { default as cors } from 'cors';
import dotenv from 'dotenv';
import config from './config/index.js';
import { connectDB } from './config/database.js';
import usersRoutes from './api/routes/users.routes.js';
import authRoutes from './api/routes/auth.routes.js';
import clientesRoutes from './api/routes/clientes.routes.js';

dotenv.config();

const app = express();
const PORT = config.port;

app.use(cors());
app.use(express.json());

app.use(`${config.api.prefix}/auth`, authRoutes);
app.use(`${config.api.prefix}/usuarios`, usersRoutes);
app.use(`${config.api.prefix}/clientes`, clientesRoutes);


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();