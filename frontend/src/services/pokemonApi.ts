


const BASE_URL = 'http://localhost:3000';

// Tipos básicos según backend
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonResponse {
  id: number;
  name: string;
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
}

export interface PokemonStatsResponse {
  stats: PokemonStat[];
}

export interface PokemonTypesResponse {
  types: PokemonType[];
}

export interface PokemonAbilitiesResponse {
  abilities: PokemonAbility[];
}

export class PokemonApiService {
  // Info completa de un Pokémon
  static async getPokemon(identifier: string | number): Promise<PokemonResponse> {
    const res = await fetch(`${BASE_URL}/pokemon/${identifier}`);
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error || 'Pokémon no encontrado');
    }
    return res.json();
  }

  // Stats de un Pokémon
  static async getPokemonStats(identifier: string | number): Promise<PokemonStatsResponse> {
    const res = await fetch(`${BASE_URL}/pokemon/${identifier}/stats`);
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error || 'Pokémon no encontrado');
    }
    return res.json();
  }

  // Tipos de un Pokémon
  static async getPokemonTypes(identifier: string | number): Promise<PokemonTypesResponse> {
    const res = await fetch(`${BASE_URL}/pokemon/${identifier}/types`);
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error || 'Pokémon no encontrado');
    }
    return res.json();
  }

  // Habilidades de un Pokémon
  static async getPokemonAbilities(identifier: string | number): Promise<PokemonAbilitiesResponse> {
    const res = await fetch(`${BASE_URL}/pokemon/${identifier}/abilities`);
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error || 'Pokémon no encontrado');
    }
    return res.json();
  }

  // Favoritos
  static async addFavorite(identifier: string | number): Promise<{ favorites: string[] }> {
    const res = await fetch(`${BASE_URL}/favorites/${identifier}`, { method: 'POST' });
    if (!res.ok) {
      throw new Error('No se pudo agregar a favoritos');
    }
    return res.json();
  }

  static async getFavorites(): Promise<{ favorites: string[] }> {
    const res = await fetch(`${BASE_URL}/favorites`);
    if (!res.ok) {
      throw new Error('No se pudo obtener favoritos');
    }
    return res.json();
  }

  // Comparaciones
  static async addComparison(identifier: string | number): Promise<{ comparisons: string[] }> {
    const res = await fetch(`${BASE_URL}/comparisons/${identifier}`, { method: 'POST' });
    if (!res.ok) {
      throw new Error('No se pudo agregar a comparaciones');
    }
    return res.json();
  }

  static async getComparisons(): Promise<{ comparisons: string[] }> {
    const res = await fetch(`${BASE_URL}/comparisons`);
    if (!res.ok) {
      throw new Error('No se pudo obtener comparaciones');
    }
    return res.json();
  }
}