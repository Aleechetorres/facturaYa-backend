import express from 'express';
import { default as cors } from 'cors';
import dotenv from 'dotenv';
import config from './config/index.js';
import { connectDB } from './config/database.js';
import usersRoutes from './api/routes/users.routes.js';
import authRoutes from './api/routes/auth.routes.js';
import clientesRoutes from './api/routes/clientes.routes.js';
import categoriasRoutes from './api/routes/categorias.routes.js';
import productosRoutes from './api/routes/productos.routes.js'
import facturasRoutes from './api/routes/facturas.routes.js'
import { initModels } from './config/models.js'; //

dotenv.config();

const app = express();
const PORT = config.port;

app.use(cors());
app.use(express.json());

app.use(`${config.api.prefix}/auth`, authRoutes);
app.use(`${config.api.prefix}/usuarios`, usersRoutes);
app.use(`${config.api.prefix}/clientes`, clientesRoutes);
app.use(`${config.api.prefix}/categorias`, categoriasRoutes);
app.use(`${config.api.prefix}/productos`, productosRoutes);
app.use(`${config.api.prefix}/facturas`, facturasRoutes);

// Health check endpoint para monitoring y warm-up
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'FacturaYa API',
    uptime: process.uptime()
  });
});

const startServer = async () => {
  try {
    await connectDB();

    //inicializar modelos de bd para estar disponibles siempre
    initModels();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();