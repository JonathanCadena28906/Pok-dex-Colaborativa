import Fastify from "fastify";
import axios from "axios";
import {
  PokemonResponse,
  PokemonStatsResponse,
  PokemonTypesResponse,
  PokemonAbilitiesResponse,
} from "./dtos/pokemon.dto";
import { Cache } from "./types/cache";

const fastify = Fastify();

// Registrar CORS para permitir requests del frontend
fastify.addHook("preHandler", async (request, reply) => {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  reply.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (request.method === "OPTIONS") {
    reply.code(200).send();
    return;
  }
});

// Memoria cache simple
const cache: Cache = {
  favorites: [],
  comparisons: [],
};

// Helper para obtener datos de PokeAPI
async function fetchPokemon(
  identifier: string | number
): Promise<PokemonResponse> {
  const url = `https://pokeapi.co/api/v2/pokemon/${identifier}`;
  const res = await axios.get(url);
  const data = res.data as any;
  return {
    id: data.id,
    name: data.name,
    stats: data.stats,
    types: data.types,
    abilities: data.abilities,
  };
}

// Endpoint: info completa
fastify.get(
  "/pokemon/:identifier",
  async (request, reply): Promise<PokemonResponse | { error: string }> => {
    const { identifier } = request.params as { identifier: string };
    try {
      const pokemon = await fetchPokemon(identifier);
      return pokemon;
    } catch {
      reply.code(404);
      return { error: "Pokémon no encontrado" };
    }
  }
);

// Endpoint: solo stats
fastify.get(
  "/pokemon/:identifier/stats",
  async (request, reply): Promise<PokemonStatsResponse | { error: string }> => {
    const { identifier } = request.params as { identifier: string };
    try {
      const pokemon = await fetchPokemon(identifier);
      return { stats: pokemon.stats };
    } catch {
      reply.code(404);
      return { error: "Pokémon no encontrado" };
    }
  }
);

// Endpoint: solo tipos
fastify.get(
  "/pokemon/:identifier/types",
  async (request, reply): Promise<PokemonTypesResponse | { error: string }> => {
    const { identifier } = request.params as { identifier: string };
    try {
      const pokemon = await fetchPokemon(identifier);
      return { types: pokemon.types };
    } catch {
      reply.code(404);
      return { error: "Pokémon no encontrado" };
    }
  }
);

// Endpoint: solo habilidades
fastify.get(
  "/pokemon/:identifier/abilities",
  async (
    request,
    reply
  ): Promise<PokemonAbilitiesResponse | { error: string }> => {
    const { identifier } = request.params as { identifier: string };
    try {
      const pokemon = await fetchPokemon(identifier);
      return { abilities: pokemon.abilities };
    } catch {
      reply.code(404);
      return { error: "Pokémon no encontrado" };
    }
  }
);

// Favoritos
fastify.post("/favorites/:identifier", async (request, reply) => {
  const { identifier } = request.params as { identifier: string };
  if (!cache.favorites.includes(identifier)) {
    cache.favorites.push(identifier);
  }
  return { favorites: cache.favorites };
});

fastify.get("/favorites", async () => {
  return { favorites: cache.favorites };
});

// Comparaciones
fastify.post("/comparisons/:identifier", async (request, reply) => {
  const { identifier } = request.params as { identifier: string };
  if (!cache.comparisons.includes(identifier)) {
    cache.comparisons.push(identifier);
  }
  return { comparisons: cache.comparisons };
});

fastify.get("/comparisons", async () => {
  return { comparisons: cache.comparisons };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
