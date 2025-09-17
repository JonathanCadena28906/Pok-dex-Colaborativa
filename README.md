# Pokédex Colaborativa

Una aplicación fullstack completa de Pokédex que permite explorar, buscar y gestionar información detallada de Pokémon a través de una interfaz moderna y un backend optimizado.

## 🌟 Características Principales

- **Búsqueda avanzada**: Busca Pokémon por nombre o ID con validación en tiempo real
- **Vista detallada**: Información completa incluyendo stats, tipos, habilidades y sprites
- **Sistema de favoritos**: Gestiona tu equipo de Pokémon favoritos con persistencia local
- **Comparador de Pokémon**: Compara stats entre diferentes Pokémon
- **API optimizada**: Backend con caché para mejor rendimiento
- **Diseño responsivo**: Interfaz adaptativa con tema Pokéball

## 🏗️ Arquitectura del Proyecto

### Frontend (React + TypeScript + ShadCN/UI)
- **Framework**: React 18 con TypeScript y Vite
- **UI/UX**: ShadCN/UI components con Tailwind CSS
- **Estado**: Context API para gestión de favoritos
- **Servicios**: Cliente HTTP para comunicación con backend
- **Diseño**: Tema inspirado en Pokéball con gradientes dinámicos

### Backend (Fastify + TypeScript)
- **Framework**: Fastify para APIs de alto rendimiento
- **Proxy**: Intermediario optimizado para PokeAPI
- **Cache**: Sistema de caché en memoria para reducir latencia
- **Tipos**: DTOs compartidos para consistencia de datos

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación Rápida

```bash
# Clonar el repositorio
git clone <repository-url>
cd project

# Instalar dependencias del frontend
cd frontend
npm install

# Instalar dependencias del backend
cd ../backend
npm install
```

### Ejecución en Desarrollo

#### Opción 1: Ejecutar Frontend y Backend Simultáneamente
```bash
# Desde la carpeta frontend
npm run dev:full
```

#### Opción 2: Ejecutar por Separado
```bash
# Terminal 1: Backend (Puerto 3000)
cd backend
npm run dev

# Terminal 2: Frontend (Puerto 5173)
cd frontend
npm run dev
```

## 📡 API Endpoints

### Información de Pokémon
- `GET /pokemon/:identifier` - Información completa de un Pokémon
- `GET /pokemon/:identifier/stats` - Solo estadísticas
- `GET /pokemon/:identifier/types` - Solo tipos
- `GET /pokemon/:identifier/abilities` - Solo habilidades

### Sistema de Favoritos
- `POST /favorites/:identifier` - Agregar a favoritos
- `GET /favorites` - Obtener lista de favoritos

### Sistema de Comparación
- `POST /comparisons/:identifier` - Marcar para comparación
- `GET /comparisons` - Obtener lista de comparaciones

### Ejemplos de Uso
```bash
# Obtener información de Pikachu
curl http://localhost:3000/pokemon/pikachu

# Obtener solo stats de Charizard
curl http://localhost:3000/pokemon/charizard/stats

# Agregar Pikachu a favoritos
curl -X POST http://localhost:3000/favorites/pikachu
```

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Biblioteca de interfaces
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **ShadCN/UI** - Componentes UI modernos
- **Radix UI** - Componentes primitivos accesibles
- **Lucide React** - Iconografía
- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de esquemas

### Backend
- **Fastify** - Framework web rápido
- **TypeScript** - Tipado estático
- **Axios** - Cliente HTTP
- **ts-node** - Ejecución directa de TypeScript

## 📊 Estructura del Proyecto

```
project/
├── README.md                    # Documentación principal
├── frontend/                    # Aplicación React
│   ├── src/
│   │   ├── components/         # Componentes UI reutilizables
│   │   │   ├── ui/            # Componentes base de ShadCN
│   │   │   ├── SearchBar.tsx   # Barra de búsqueda
│   │   │   ├── PokemonCard.tsx # Tarjeta de Pokémon
│   │   │   ├── PokemonDetails.tsx # Vista detallada
│   │   │   └── ...
│   │   ├── contexts/          # Providers de React Context
│   │   ├── services/          # Servicios de API
│   │   ├── types/             # Definiciones TypeScript
│   │   ├── hooks/             # Custom hooks
│   │   └── lib/               # Utilidades
│   ├── package.json
│   └── ...
└── backend/                     # API Fastify
    ├── src/
    │   ├── index.ts            # Servidor principal
    │   ├── dtos/              # Data Transfer Objects
    │   └── types/             # Tipos TypeScript
    ├── package.json
    └── README.md
```

## 🎯 Funcionalidades Implementadas

### ✅ Core Features
- [x] Búsqueda de Pokémon por nombre/ID
- [x] Vista detallada con información completa
- [x] Sistema de favoritos persistente
- [x] Comparador de estadísticas
- [x] API backend con caché
- [x] Interfaz responsiva
- [x] Manejo de errores y estados de carga

### 🎨 Diseño y UX
- [x] Tema visual inspirado en Pokéball
- [x] Gradientes dinámicos por tipos de Pokémon
- [x] Animaciones y transiciones suaves
- [x] Componentes accesibles
- [x] Diseño mobile-first

## 🔧 Scripts Disponibles

### Frontend
```bash
npm run dev          # Servidor de desarrollo
npm run dev:full     # Frontend + Backend simultáneo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linting con ESLint
```

### Backend
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Compilar TypeScript
npm run start        # Ejecutar versión compilada
```

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **API Base**: http://localhost:3000

## 🤝 Contribuciones

Este proyecto está diseñado para ser colaborativo. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **PokéAPI** - Por proporcionar los datos de Pokémon
- **ShadCN/UI** - Por los componentes UI de alta calidad
- **Radix UI** - Por los primitivos accesibles
- **Tailwind CSS** - Por el framework de estilos

---

**Hecho con ❤️ por la comunidad de desarrolladores Pokémon**
