import React from 'react';
import { Heart, X, BarChart3, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useFavorites } from '@/contexts/FavoritesContext';
import { TYPE_COLORS } from '@/types/pokemon';

interface FavoritesPanelProps {
  onViewPokemon?: (name: string) => void;
  onCompareTeam?: () => void;
  className?: string;
}

export const FavoritesPanel: React.FC<FavoritesPanelProps> = ({
  onViewPokemon,
  onCompareTeam,
  className = '',
}) => {
  const { favorites, removeFavorite, clearFavorites, favoritesCount } = useFavorites();

  if (favoritesCount === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Heart className="h-5 w-5" />
            Your Team
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 mb-2">No Pokemon in your team yet</p>
          <p className="text-sm text-gray-500">
            Search and add Pokemon to build your dream team!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Heart className="h-5 w-5" />
            Your Team ({favoritesCount}/6)
          </CardTitle>
          <div className="flex items-center gap-2">
            {favoritesCount > 1 && onCompareTeam && (
              <Button
                onClick={onCompareTeam}
                size="sm"
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Compare
              </Button>
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Team</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove all Pokemon from your team? 
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={clearFavorites}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Clear Team
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {favorites.map((pokemon) => {
            const primaryType = pokemon.types[0];
            const typeColor = TYPE_COLORS[primaryType] || '#A8A878';
            
            return (
              <div
                key={pokemon.id}
                className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-100 hover:border-red-200 transition-colors"
                style={{ 
                  background: `linear-gradient(90deg, ${typeColor}10, ${typeColor}05)` 
                }}
              >
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 capitalize">
                    {pokemon.name}
                  </h4>
                  <div className="flex gap-1 mt-1">
                    {pokemon.types.map((type) => (
                      <Badge
                        key={type}
                        className="text-xs text-white font-semibold px-2 py-0"
                        style={{ backgroundColor: TYPE_COLORS[type] }}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {onViewPokemon && (
                    <Button
                      onClick={() => onViewPokemon(pokemon.name)}
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    onClick={() => removeFavorite(pokemon.id)}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        
        {favoritesCount >= 6 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 text-center">
              <strong>Team Full!</strong> You have reached the maximum of 6 Pokemon.
              Remove some to add new ones.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};