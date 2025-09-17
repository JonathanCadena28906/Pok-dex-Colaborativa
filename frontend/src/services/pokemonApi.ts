import { Pokemon, PokemonListResponse, ApiResponse } from '@/types/pokemon';

const BASE_URL = 'http://localhost:3001/api';

export class PokemonApiService {
  private static async fetchFromBackend<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });
      
      const result: ApiResponse<T> = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }
      
      return result;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Network error');
    }
  }

  static async searchPokemon(query: string): Promise<Pokemon> {
    const result = await this.fetchFromBackend<Pokemon>(`/pokemon/${query.toLowerCase()}`);
    
    if (!result.success || !result.data) {
      throw new Error(result.error || `Pokemon "${query}" not found`);
    }
    
    return result.data;
  }

  static async getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
    const result = await this.fetchFromBackend<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
    
    if (!result.success || !result.data) {
      throw new Error(result.error || 'Failed to fetch pokemon list');
    }
    
    return result.data;
  }

  static async getPokemonById(id: number): Promise<Pokemon> {
    return this.searchPokemon(id.toString());
  }

  static async getRandomPokemon(): Promise<Pokemon> {
    const result = await this.fetchFromBackend<Pokemon>('/pokemon/random/get');
    
    if (!result.success || !result.data) {
      throw new Error(result.error || 'Failed to fetch random pokemon');
    }
    
    return result.data;
  }

  static async getPokemonByType(type: string): Promise<any> {
    const result = await this.fetchFromBackend<any>(`/type/${type}`);
    
    if (!result.success || !result.data) {
      throw new Error(result.error || `Type "${type}" not found`);
    }
    
    return result.data;
  }

  // Método para obtener múltiples pokemon (para comparación)
  static async getMultiplePokemon(queries: string[]): Promise<Pokemon[]> {
    const result = await this.fetchFromBackend<Pokemon[]>('/pokemon/multiple', {
      method: 'POST',
      body: JSON.stringify({ queries }),
    });
    
    if (!result.success || !result.data) {
      throw new Error(result.error || 'Failed to fetch multiple pokemon');
    }
    
    return result.data;
  }

  // Método para obtener estadísticas del cache del backend
  static async getCacheStats(): Promise<any> {
    const result = await this.fetchFromBackend<any>('/cache/stats');
    
    if (!result.success || !result.data) {
      throw new Error(result.error || 'Failed to fetch cache stats');
    }
    
    return result.data;
  }

  // Método para limpiar el cache del backend
  static async clearCache(): Promise<any> {
    const result = await this.fetchFromBackend<any>('/cache', {
      method: 'DELETE',
    });
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to clear cache');
    }
    
    return result;
  }
}