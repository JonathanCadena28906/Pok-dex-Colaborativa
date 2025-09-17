
# Fastify API TypeScript

API sencilla con Fastify y TypeScript para consultar información de Pokémon usando la PokeAPI. Incluye endpoints para obtener información completa, stats, tipos, habilidades, favoritos y comparaciones. Estructura con carpetas para tipos y DTOs.

## Instalación

1. Clona el repositorio.
2. Entra a la carpeta `backend`.
3. Instala las dependencias:

- `npm install`

## Scripts

- `npm run dev`: Ejecuta en modo desarrollo
- `npm run build`: Compila TypeScript
- `npm start`: Ejecuta el proyecto compilado

## Endpoints

### Obtener información completa de un Pokémon

`GET /pokemon/:identifier`
Devuelve la información completa de un Pokémon por nombre o ID.
**Ejemplo:** `/pokemon/pikachu` o `/pokemon/25`

### Obtener solo los stats de un Pokémon

`GET /pokemon/:identifier/stats`
Devuelve solo los stats del Pokémon.

### Obtener solo los tipos de un Pokémon

`GET /pokemon/:identifier/types`
Devuelve solo los tipos del Pokémon.

### Obtener solo las habilidades de un Pokémon

`GET /pokemon/:identifier/abilities`
Devuelve solo las habilidades del Pokémon.

### Marcar Pokémon como favorito

`POST /favorites/:identifier`
Agrega el Pokémon (por nombre o ID) a la lista de favoritos.

### Obtener lista de favoritos

`GET /favorites`
Devuelve la lista de Pokémon favoritos.

### Marcar Pokémon para comparación

`POST /comparisons/:identifier`
Agrega el Pokémon (por nombre o ID) a la lista de comparaciones.

### Obtener lista de comparaciones

`GET /comparisons`
Devuelve la lista de Pokémon marcados para comparación.

## Estructura de carpetas

- `src/dtos`: DTOs de entrada y salida
- `src/types`: Tipos globales y de cache

## Ejemplo de uso

```bash
curl http://localhost:3000/pokemon/pikachu
curl http://localhost:3000/pokemon/pikachu/stats
curl -X POST http://localhost:3000/favorites/pikachu
curl http://localhost:3000/favorites
```
