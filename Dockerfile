# ===================================
# Dockerfile para FacturaYa Backend
# Node.js + TypeScript + MongoDB
# ===================================

# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar TODAS las dependencias (incluidas dev para compilar TypeScript)
RUN npm ci

# Copiar código fuente
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# ===================================
# Etapa 2: Production
FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar SOLO dependencias de producción
RUN npm ci --only=production

# Copiar código compilado desde builder
COPY --from=builder /app/dist ./dist

# Variables de entorno por defecto (serán sobrescritas en Render)
ENV NODE_ENV=production
ENV PORT=5000

# Exponer puerto
EXPOSE 5000

# Usuario no-root para seguridad
USER node

# Comando de inicio
CMD ["node", "dist/Server.js"]
