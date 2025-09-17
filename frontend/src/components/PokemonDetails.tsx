import React from 'react';
import { ArrowLeft, Heart, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Pokemon, TYPE_COLORS, STAT_NAMES } from '@/types/pokemon';
import { useFavorites } from '@/contexts/FavoritesContext';
import { cn } from '@/lib/utils';

interface PokemonDetailsProps {
  pokemon: Pokemon;
  onBack: () => void;
  onCompare?: () => void;
}

export const PokemonDetails: React.FC<PokemonDetailsProps> = ({
  pokemon,
  onBack,
  onCompare,
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
  const secondaryType = pokemon.types[1]?.type.name;
  const primaryColor = TYPE_COLORS[primaryType] || '#A8A878';
  const secondaryColor = secondaryType ? TYPE_COLORS[secondaryType] : primaryColor;

  const backgroundGradient = secondaryType
    ? `linear-gradient(135deg, ${primaryColor}15 0%, ${secondaryColor}15 100%)`
    : `linear-gradient(135deg, ${primaryColor}15 0%, ${primaryColor}25 100%)`;

  return (
    <div className="min-h-screen" style={{ background: backgroundGradient }}>
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center gap-2 bg-pink-100 hover:bg-pink-200 text-pink-600 hover:text-red-600 border border-pink-200"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 capitalize">
                  {pokemon.name}
                </h1>
                <p className="text-lg text-gray-600">
                  #{pokemon.id.toString().padStart(3, '0')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleFavoriteToggle}
                variant={isInFavorites ? "default" : "outline"}
                className={cn(
                  "flex items-center gap-2",
                  isInFavorites 
                    ? "bg-red-600 hover:bg-red-700 text-white" 
                    : "border-red-300 text-red-700 hover:bg-red-50"
                )}
              >
                <Heart className={cn('h-4 w-4', isInFavorites && 'fill-current')} />
                {isInFavorites ? 'Remove from Team' : 'Add to Team'}
              </Button>
              {onCompare && (
                <Button
                  onClick={onCompare}
                  variant="outline"
                  className="flex items-center gap-2 border-red-300 text-red-700 hover:bg-red-50"
                >
                  <BarChart3 className="h-4 w-4" />
                  Compare
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imagen y información básica */}
          <Card className="overflow-hidden">
            <CardContent className="p-8 text-center">
              {/* Imagen principal */}
              <div className="relative mb-6">
                <div 
                  className="w-64 h-64 mx-auto rounded-full shadow-2xl flex items-center justify-center border-8 border-white"
                  style={{ 
                    background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)`
                  }}
                >
                  <img
                    src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-48 h-48 object-contain"
                  />
                </div>
              </div>

              {/* Tipos */}
              <div className="flex gap-3 justify-center mb-6">
                {pokemon.types.map((typeInfo) => (
                  <Badge
                    key={typeInfo.type.name}
                    className="text-white font-bold capitalize px-4 py-2 text-sm"
                    style={{ backgroundColor: TYPE_COLORS[typeInfo.type.name] }}
                  >
                    {typeInfo.type.name}
                  </Badge>
                ))}
              </div>

              {/* Información física */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Height</p>
                  <p className="text-2xl font-bold text-gray-900">{pokemon.height / 10}m</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Weight</p>
                  <p className="text-2xl font-bold text-gray-900">{pokemon.weight / 10}kg</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Base Exp</p>
                  <p className="text-2xl font-bold text-gray-900">{pokemon.base_experience}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats y habilidades */}
          <div className="space-y-6">
            {/* Base Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Base Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pokemon.stats.map((stat) => {
                  const percentage = (stat.base_stat / 255) * 100;
                  const statColor = stat.base_stat >= 100 ? primaryColor : 
                                  stat.base_stat >= 70 ? '#FFA500' : '#808080';
                  
                  return (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">
                          {STAT_NAMES[stat.stat.name]}
                        </span>
                        <span className="font-bold text-gray-900">
                          {stat.base_stat}
                        </span>
                      </div>
                      <Progress 
                        value={percentage} 
                        className="h-3"
                        style={{
                          '--progress-background': statColor,
                        } as React.CSSProperties}
                      />
                    </div>
                  );
                })}
                
                {/* Total stats */}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-xl text-gray-900">
                      {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Habilidades */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Abilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pokemon.abilities.map((abilityInfo) => (
                    <div
                      key={abilityInfo.ability.name}
                      className={cn(
                        'p-3 rounded-lg border-2',
                        abilityInfo.is_hidden
                          ? 'bg-purple-50 border-purple-200'
                          : 'bg-gray-50 border-gray-200'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium capitalize text-gray-900">
                          {abilityInfo.ability.name.replace('-', ' ')}
                        </span>
                        {abilityInfo.is_hidden && (
                          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                            Hidden
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sprites adicionales */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Sprites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Normal</p>
                    <img
                      src={pokemon.sprites.front_default}
                      alt={`${pokemon.name} normal`}
                      className="w-16 h-16 mx-auto object-contain"
                    />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Shiny</p>
                    <img
                      src={pokemon.sprites.front_shiny}
                      alt={`${pokemon.name} shiny`}
                      className="w-16 h-16 mx-auto object-contain"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};