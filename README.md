# FacturaYa Backend

API REST para el sistema de facturación electrónica FacturaYa.

## 🚀 Características

- **CRUD de Usuarios**: Registro, autenticación y gestión de usuarios
- **CRUD de Clientes**: Gestión completa de información de clientes
- **Autenticación JWT**: Sistema de tokens seguros
- **Base de datos MongoDB**: Almacenamiento NoSQL escalable
- **TypeScript**: Desarrollo con tipado estático
- **Arquitectura modular**: Separación clara de responsabilidades

## 📋 Prerrequisitos

- Node.js 18+
- MongoDB (local o Atlas)
- npm

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd facturaYa-backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```

4. Configura tu base de datos MongoDB en `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/facturaYa
JWT_SECRET=tu_clave_secreta_jwt
PORT=3000
```

## 🚀 Ejecución

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

## 📚 Endpoints de la API

### Autenticación
- `POST /api/v1/auth/login` - Iniciar sesión

### Usuarios
- `GET /api/v1/usuarios` - Listar usuarios (requiere autenticación)
- `POST /api/v1/usuarios` - Crear usuario (requiere autenticación)

### Clientes
- `GET /api/v1/clientes` - Listar clientes (requiere autenticación)
- `POST /api/v1/clientes` - Crear cliente (requiere autenticación)
- `PATCH /api/v1/clientes/:documento` - Actualizar cliente (requiere autenticación)

## 🏗️ Estructura del Proyecto

```
src/
├── api/
│   ├── controllers/     # Controladores de rutas
│   ├── middlewares/     # Middlewares (autenticación, etc.)
│   └── routes/          # Definición de rutas
├── config/              # Configuración de BD y app
├── dtos/                # Data Transfer Objects
├── schemas/             # Esquemas de MongoDB
├── services/            # Lógica de negocio
├── types/               # Tipos de TypeScript
└── Server.ts            # Punto de entrada
```

## 🔧 Tecnologías

- **Express.js** - Framework web
- **MongoDB + Mongoose** - Base de datos y ODM
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **Joi** - Validación de datos
- **TypeScript** - Lenguaje de programación

## 📄 Licencia

© 2025 DreamTeam - ISC License