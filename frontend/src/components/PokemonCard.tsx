import React from 'react';
import { Heart, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pokemon, TYPE_COLORS, STAT_NAMES } from '@/types/pokemon';
import { useFavorites } from '@/contexts/FavoritesContext';
import { cn } from '@/lib/utils';

interface PokemonCardProps {
  pokemon: Pokemon;
  onViewDetails?: () => void;
  onCompare?: () => void;
  className?: string;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onViewDetails,
  onCompare,
  className,
}) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isInFavorites = isFavorite(pokemon.id);

  const handleFavoriteToggle = () => {
    if (isInFavorites) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite({
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
        types: pokemon.types.map(t => t.type.name),
      });
    }
  };

  const primaryType = pokemon.types[0]?.type.name;
  const typeColor = TYPE_COLORS[primaryType] || '#A8A878';

  // Crear gradiente basado en tipos
  const createTypeGradient = () => {
    if (pokemon.types.length === 1) {
      return `linear-gradient(135deg, ${typeColor}20, ${typeColor}40)`;
    } else {
      const secondaryType = pokemon.types[1]?.type.name;
      const secondaryColor = TYPE_COLORS[secondaryType] || '#A8A878';
      return `linear-gradient(135deg, ${typeColor}20, ${secondaryColor}20)`;
    }
  };

  return (
    <Card 
      className={cn(
        'group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border-2 border-red-100 hover:border-red-300',
        className
      )}
      style={{ background: createTypeGradient() }}
    >
      <CardContent className="p-6">
        {/* Header con nombre y número */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 capitalize">
              {pokemon.name}
            </h3>
            <p className="text-sm text-gray-600">
              #{pokemon.id.toString().padStart(3, '0')}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteToggle}
            className={cn(
              'h-8 w-8 p-0 rounded-full',
              isInFavorites 
                ? 'text-red-600 hover:text-red-700 bg-red-50' 
                : 'text-gray-400 hover:text-red-600'
            )}
          >
            <Heart className={cn('h-4 w-4', isInFavorites && 'fill-current')} />
          </Button>
        </div>

        {/* Imagen del Pokemon */}
        <div className="relative mb-4">
          <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-inner flex items-center justify-center">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-24 h-24 object-contain transition-transform group-hover:scale-110"
            />
          </div>
        </div>

        {/* Tipos */}
        <div className="flex gap-2 justify-center mb-4">
          {pokemon.types.map((typeInfo) => (
            <Badge
              key={typeInfo.type.name}
              className="text-white font-semibold capitalize px-3 py-1"
              style={{ backgroundColor: TYPE_COLORS[typeInfo.type.name] }}
            >
              {typeInfo.type.name}
            </Badge>
          ))}
        </div>

        {/* Stats principales */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="bg-white bg-opacity-60 rounded-lg p-2">
            <p className="text-xs text-gray-600">Height</p>
            <p className="font-semibold">{pokemon.height / 10}m</p>
          </div>
          <div className="bg-white bg-opacity-60 rounded-lg p-2">
            <p className="text-xs text-gray-600">Weight</p>
            <p className="font-semibold">{pokemon.weight / 10}kg</p>
          </div>
          <div className="bg-white bg-opacity-60 rounded-lg p-2">
            <p className="text-xs text-gray-600">Exp</p>
            <p className="font-semibold">{pokemon.base_experience}</p>
          </div>
        </div>

        {/* Stats de batalla */}
        <div className="space-y-2 mb-4">
          {pokemon.stats.slice(0, 3).map((stat) => {
            const percentage = (stat.base_stat / 255) * 100;
            return (
              <div key={stat.stat.name} className="bg-white bg-opacity-60 rounded-lg p-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-700">
                    {STAT_NAMES[stat.stat.name]}
                  </span>
                  <span className="text-xs font-bold text-gray-900">
                    {stat.base_stat}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: typeColor,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          {onViewDetails && (
            <Button
              onClick={onViewDetails}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              size="sm"
            >
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
          )}
          {onCompare && (
            <Button
              onClick={onCompare}
              variant="outline"
              className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
              size="sm"
            >
              Compare
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};