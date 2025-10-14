# ===================================
# Dockerfile para FacturaYa Backend
# Node.js + TypeScript + MongoDB
# ===================================

# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# ===================================
# Etapa 2: Production
FROM node:18-alpine

WORKDIR /app

# Copiar solo lo necesario desde builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Variables de entorno por defecto (serán sobrescritas en Render)
ENV NODE_ENV=production
ENV PORT=5000

# Exponer puerto
EXPOSE 5000

# Usuario no-root para seguridad
USER node

# Comando de inicio
CMD ["node", "dist/Server.js"]
