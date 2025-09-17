import React, { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { PokemonCard } from '@/components/PokemonCard';
import { PokemonDetails } from '@/components/PokemonDetails';
import { PokemonComparator } from '@/components/PokemonComparator';
import { FavoritesPanel } from '@/components/FavoritesPanel';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { FavoritesProvider, useFavorites } from '@/contexts/FavoritesContext';
import { PokemonApiService } from '@/services/pokemonApi';
import { Pokemon } from '@/types/pokemon';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Heart } from 'lucide-react';
import './App.css';

type ViewState = 'search' | 'details' | 'compare';

interface AppState {
  currentView: ViewState;
  currentPokemon: Pokemon | null;
  comparePokemon: Pokemon[];
  isLoading: boolean;
  searchResults: Pokemon[];
}

const AppContent: React.FC = () => {
  const { favorites } = useFavorites();
  const [state, setState] = useState<AppState>({
    currentView: 'search',
    currentPokemon: null,
    comparePokemon: [],
    isLoading: false,
    searchResults: [],
  });

  const handleSearch = async (query: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const pokemon = await PokemonApiService.searchPokemon(query);
      setState(prev => ({
        ...prev,
        currentPokemon: pokemon,
        currentView: 'details',
        isLoading: false,
        searchResults: [pokemon],
      }));
      
      toast({
        title: "Pokemon found!",
        description: `Found ${pokemon.name} (#${pokemon.id})`,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      toast({
        title: "Pokemon not found",
        description: `Could not find pokemon "${query}". Try a different name or ID.`,
        variant: "destructive",
      });
    }
  };

  const handleRandomSearch = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const pokemon = await PokemonApiService.getRandomPokemon();
      setState(prev => ({
        ...prev,
        currentPokemon: pokemon,
        currentView: 'details',
        isLoading: false,
        searchResults: [pokemon],
      }));
      
      toast({
        title: "Random Pokemon found!",
        description: `Discovered ${pokemon.name} (#${pokemon.id})`,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      toast({
        title: "Error",
        description: "Could not fetch random pokemon. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (pokemon: Pokemon) => {
    setState(prev => ({
      ...prev,
      currentPokemon: pokemon,
      currentView: 'details',
    }));
  };

  const handleViewPokemonByName = async (name: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const pokemon = await PokemonApiService.searchPokemon(name);
      handleViewDetails(pokemon);
    } catch (error) {
      toast({
        title: "Error",
        description: `Could not load ${name}`,
        variant: "destructive",
      });
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleStartCompare = (pokemon?: Pokemon) => {
    const pokemonToCompare = pokemon ? [pokemon] : [];
    setState(prev => ({
      ...prev,
      comparePokemon: pokemonToCompare,
      currentView: 'compare',
    }));
  };

  const handleCompareTeam = async () => {
    if (favorites.length === 0) return;
    
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const pokemonNames = favorites.map(fav => fav.name);
      const pokemonData = await PokemonApiService.getMultiplePokemon(pokemonNames);
      setState(prev => ({
        ...prev,
        comparePokemon: pokemonData,
        currentView: 'compare',
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      toast({
        title: "Error",
        description: "Could not load team pokemon for comparison",
        variant: "destructive",
      });
    }
  };

  const handleBackToSearch = () => {
    setState(prev => ({
      ...prev,
      currentView: 'search',
      currentPokemon: null,
      comparePokemon: [],
    }));
  };

  const renderContent = () => {
    if (state.isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-lg text-gray-600">Loading Pokemon...</p>
        </div>
      );
    }

    switch (state.currentView) {
      case 'details':
        return state.currentPokemon ? (
          <PokemonDetails
            pokemon={state.currentPokemon}
            onBack={handleBackToSearch}
            onCompare={() => handleStartCompare(state.currentPokemon)}
          />
        ) : null;

      case 'compare':
        return (
          <PokemonComparator
            initialPokemon={state.comparePokemon}
            onBack={handleBackToSearch}
          />
        );

      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
              <div className="container mx-auto px-4 py-6">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-8 h-8 bg-white rounded-full shadow-inner"></div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">
                      Pokédex Colaborativa
                    </h1>
                  </div>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Explore, discover and build your dream Pokemon team. 
                    Search for Pokemon, compare their stats, and create your ultimate collection.
                  </p>
                </div>

                <SearchBar
                  onSearch={handleSearch}
                  onRandom={handleRandomSearch}
                  isLoading={state.isLoading}
                  className="mb-8"
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-3">
                  {state.searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {state.searchResults.map((pokemon) => (
                        <PokemonCard
                          key={pokemon.id}
                          pokemon={pokemon}
                          onViewDetails={() => handleViewDetails(pokemon)}
                          onCompare={() => handleStartCompare(pokemon)}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card className="text-center py-16 bg-gradient-to-br from-white to-gray-50">
                      <CardContent>
                        <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-6">
                          <div className="w-12 h-12 bg-white rounded-full shadow-inner flex items-center justify-center">
                            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          Welcome to Pokédex Colaborativa
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                          Start your Pokemon journey by searching for your favorite Pokemon 
                          or discover a random one to begin building your team.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <div className="text-sm text-gray-500">
                            🔍 Search by name or ID
                          </div>
                          <div className="text-sm text-gray-500">
                            ❤️ Build your dream team
                          </div>
                          <div className="text-sm text-gray-500">
                            📊 Compare Pokemon stats
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <FavoritesPanel
                    onViewPokemon={handleViewPokemonByName}
                    onCompareTeam={handleCompareTeam}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t mt-16">
              <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <span className="font-semibold text-gray-700">Pokédex Colaborativa</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Powered by PokeAPI</span>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>Made with love</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderContent();
};

function App() {
  return (
    <FavoritesProvider>
      <AppContent />
      <Toaster />
    </FavoritesProvider>
  );
}

export default App;