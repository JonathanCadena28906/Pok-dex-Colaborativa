# Pokédex Colaborativa

Una aplicación completa de Pokédex con frontend React y backend Fastify que actúa como proxy con caché para la PokeAPI.

## 🏗️ Arquitectura

### Frontend (React + TypeScript + ShadCN/UI)
- **Framework**: React 18 con TypeScript
- **UI Library**: ShadCN/UI con Tailwind CSS
- **Estado**: Context API para favoritos
- **Diseño**: Tema Pokeball (rojo/blanco) con gradientes por tipos

### Backend (Fastify + TypeScript)
- **Framework**: Fastify con TypeScript
- **Cache**: NodeCache con TTL de 5 minutos
- **Proxy**: Intermediario para PokeAPI
- **CORS**: Configurado para desarrollo local

## 🚀 Instalación y Ejecución

### Opción 1: Ejecutar todo junto (Recomendado)
```bash
# Instalar dependencias del frontend
npm install

# Instalar dependencias del backend
cd backend && npm install && cd ..

# Ejecutar frontend y backend simultáneamente
npm run dev:full
```

### Opción 2: Ejecutar por separado
```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: Frontend
npm install
npm run dev
```

## 📡 Endpoints del Backend

### Pokemon
- `GET /api/pokemon/:query` - Buscar pokemon por nombre o ID
- `GET /api/pokemon` - Lista de pokemon (limit, offset)
- `GET /api/pokemon/random/get` - Pokemon aleatorio
- `POST /api/pokemon/multiple` - Múltiples pokemon para comparación

### Tipos
- `GET /api/type/:type` - Pokemon por tipo

### Sistema
- `GET /api/health` - Health check
- `GET /api/cache/stats` - Estadísticas del cache
- `DELETE /api/cache` - Limpiar cache
- `GET /api/info` - Información de la API

## 🎯 Funcionalidades

### ✅ Implementadas
- **Búsqueda**: Por nombre o ID con validación
- **Vista detallada**: Stats, tipos, habilidades, sprites
- **Favoritos**: Sistema de equipo persistente (localStorage)
- **Comparador**: Hasta 4 pokemon simultáneamente
- **Cache**: Backend con cache inteligente
- **Responsive**: Diseño adaptativo
- **Tipos compartidos**: DTOs sincronizados entre front/back

### 🎨 Diseño
- **Colores**: Esquema Pokeball (rojo #DC2626, blanco)
- **Gradientes**: Basados en tipos de pokemon
- **Animaciones**: Hover states y transiciones suaves
- **Tipografía**: Jerarquía clara con espaciado 8px

## 🛠️ Tecnologías

### Frontend
- React 18 + TypeScript
- ShadCN/UI + Tailwind CSS
- Lucide React (iconos)
- Context API

### Backend
- Fastify + TypeScript
- NodeCache
- CORS support
- Pino logger

## 📊 Cache y Performance

- **TTL**: 5 minutos por defecto
- **Estrategia**: Cache-first con fallback a API
- **Limpieza**: Automática cada 60 segundos
- **Estadísticas**: Endpoint para monitoreo

## 🔧 Configuración

### Puertos
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

### Variables de Entorno
```bash
# Backend
PORT=3001
HOST=0.0.0.0
```

## 📝 Estructura del Proyecto

```
├── src/                    # Frontend React
│   ├── components/         # Componentes UI
│   ├── contexts/          # Context providers
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   └── App.tsx            # Componente principal
├── backend/               # Backend Fastify
│   ├── src/
│   │   ├── routes/        # Rutas de la API
│   │   ├── services/      # Lógica de negocio
│   │   ├── types/         # Types compartidos
│   │   └── server.ts      # Servidor principal
│   └── package.json
└── package.json           # Frontend dependencies
```

## 🧪 Testing

El proyecto incluye tipos TypeScript compartidos entre frontend y backend para garantizar consistencia en las interfaces de datos.

## 📈 Próximas Mejoras

- [ ] Tests unitarios y de integración
- [ ] Paginación en lista de pokemon
- [ ] Filtros por generación y tipo
- [ ] PWA support
- [ ] Docker containerization
- [ ] Rate limiting en backend