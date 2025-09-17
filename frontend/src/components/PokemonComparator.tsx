import React, { useState } from 'react';
import { X, Plus, BarChart3, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Pokemon, TYPE_COLORS, STAT_NAMES } from '@/types/pokemon';
import { PokemonApiService } from '@/services/pokemonApi';
import { toast } from '@/hooks/use-toast';

interface PokemonComparatorProps {
  initialPokemon?: Pokemon[];
  onBack: () => void;
}

export const PokemonComparator: React.FC<PokemonComparatorProps> = ({
  initialPokemon = [],
  onBack,
}) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addPokemon = async () => {
    if (!searchQuery.trim() || pokemon.length >= 4) return;

    setIsLoading(true);
    try {
  const newPokemon = await PokemonApiService.getPokemon(searchQuery);
      
      // Evitar duplicados
      if (pokemon.some(p => p.id === newPokemon.id)) {
        toast({
          title: "Pokemon already added",
          description: `${newPokemon.name} is already in the comparison`,
          variant: "destructive",
        });
        return;
      }

      setPokemon(prev => [...prev, newPokemon]);
      setSearchQuery('');
      toast({
        title: "Pokemon added",
        description: `${newPokemon.name} added to comparison`,
      });
    } catch (error) {
      toast({
        title: "Pokemon not found",
        description: `Could not find pokemon "${searchQuery}"`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removePokemon = (pokemonId: number) => {
    setPokemon(prev => prev.filter(p => p.id !== pokemonId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addPokemon();
    }
  };

  const getStatComparison = (statName: string) => {
    const values = pokemon.map(p => {
      const stat = p.stats.find(s => s.stat.name === statName);
      return stat ? stat.base_stat : 0;
    });
    
    const max = Math.max(...values);
    const min = Math.min(...values);
    
    return { max, min, values };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Pokemon Comparator
                </h1>
                <p className="text-gray-600">
                  Compare up to 4 Pokemon side by side
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BarChart3 className="h-4 w-4" />
              {pokemon.length}/4 Pokemon
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Add Pokemon Section */}
        {pokemon.length < 4 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add Pokemon to Compare</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter Pokemon name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={addPokemon}
                  disabled={isLoading || !searchQuery.trim()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {pokemon.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BarChart3 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Pokemon to Compare
              </h3>
              <p className="text-gray-600 mb-4">
                Add some Pokemon to start comparing their stats and abilities
              </p>
            </CardContent>
          </Card>
        )}

        {pokemon.length > 0 && (
          <>
            {/* Pokemon Overview */}
            <div className={`grid gap-6 mb-8 ${pokemon.length === 1 ? 'grid-cols-1' : pokemon.length === 2 ? 'grid-cols-2' : pokemon.length === 3 ? 'grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'}`}>
              {pokemon.map((poke) => {
                const primaryType = poke.types[0]?.type.name;
                const typeColor = TYPE_COLORS[primaryType] || '#A8A878';
                
                return (
                  <Card key={poke.id} className="relative overflow-hidden">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePokemon(poke.id)}
                      className="absolute top-2 right-2 h-8 w-8 p-0 text-gray-400 hover:text-red-600 z-10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    
                    <CardContent className="p-4 text-center"
                      style={{ 
                        background: `linear-gradient(135deg, ${typeColor}15, ${typeColor}25)` 
                      }}
                    >
                      <img
                        src={poke.sprites.other['official-artwork'].front_default || poke.sprites.front_default}
                        alt={poke.name}
                        className="w-20 h-20 mx-auto mb-3"
                      />
                      <h3 className="font-bold text-lg capitalize text-gray-900 mb-1">
                        {poke.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        #{poke.id.toString().padStart(3, '0')}
                      </p>
                      <div className="flex gap-1 justify-center">
                        {poke.types.map((typeInfo) => (
                          <Badge
                            key={typeInfo.type.name}
                            className="text-xs text-white font-semibold"
                            style={{ backgroundColor: TYPE_COLORS[typeInfo.type.name] }}
                          >
                            {typeInfo.type.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Stats Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Base Stats Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'].map((statName) => {
                    const { max, min, values } = getStatComparison(statName);
                    
                    return (
                      <div key={statName}>
                        <h4 className="font-medium text-gray-900 mb-3">
                          {STAT_NAMES[statName]}
                        </h4>
                        <div className="space-y-2">
                          {pokemon.map((poke, index) => {
                            const stat = poke.stats.find(s => s.stat.name === statName);
                            const value = stat ? stat.base_stat : 0;
                            const isMax = value === max && max !== min;
                            const isMin = value === min && max !== min;
                            const percentage = max > 0 ? (value / max) * 100 : 0;
                            
                            const typeColor = TYPE_COLORS[poke.types[0]?.type.name] || '#A8A878';
                            
                            return (
                              <div key={poke.id} className="flex items-center gap-4">
                                <div className="w-24 text-sm font-medium text-gray-700 capitalize truncate">
                                  {poke.name}
                                </div>
                                <div className="flex-1">
                                  <Progress 
                                    value={percentage}
                                    className="h-4"
                                    style={{
                                      '--progress-background': typeColor,
                                    } as React.CSSProperties}
                                  />
                                </div>
                                <div className={`w-12 text-right font-bold text-sm ${
                                  isMax ? 'text-green-600' : 
                                  isMin ? 'text-red-600' : 
                                  'text-gray-900'
                                }`}>
                                  {value}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Total Stats */}
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-3">Total Base Stats</h4>
                    <div className="space-y-2">
                      {pokemon.map((poke) => {
                        const total = poke.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
                        const maxTotal = Math.max(...pokemon.map(p => 
                          p.stats.reduce((sum, stat) => sum + stat.base_stat, 0)
                        ));
                        const percentage = (total / maxTotal) * 100;
                        const typeColor = TYPE_COLORS[poke.types[0]?.type.name] || '#A8A878';
                        
                        return (
                          <div key={poke.id} className="flex items-center gap-4">
                            <div className="w-24 text-sm font-medium text-gray-700 capitalize truncate">
                              {poke.name}
                            </div>
                            <div className="flex-1">
                              <Progress 
                                value={percentage}
                                className="h-4"
                                style={{
                                  '--progress-background': typeColor,
                                } as React.CSSProperties}
                              />
                            </div>
                            <div className="w-12 text-right font-bold text-sm text-gray-900">
                              {total}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Abilities Comparison */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Abilities Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {pokemon.map((poke) => (
                    <div key={poke.id}>
                      <h4 className="font-medium text-gray-900 mb-3 capitalize">
                        {poke.name}
                      </h4>
                      <div className="space-y-2">
                        {poke.abilities.map((abilityInfo) => (
                          <div
                            key={abilityInfo.ability.name}
                            className={`p-2 rounded text-sm ${
                              abilityInfo.is_hidden
                                ? 'bg-purple-50 text-purple-800 border border-purple-200'
                                : 'bg-gray-50 text-gray-800 border border-gray-200'
                            }`}
                          >
                            <span className="capitalize">
                              {abilityInfo.ability.name.replace('-', ' ')}
                            </span>
                            {abilityInfo.is_hidden && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                Hidden
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};