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
