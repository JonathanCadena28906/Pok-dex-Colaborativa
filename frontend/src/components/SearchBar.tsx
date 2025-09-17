import React, { useState } from 'react';
import { Search, Shuffle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onRandom: () => void;
  isLoading?: boolean;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onRandom,
  isLoading = false,
  className,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleRandom = () => {
    setQuery('');
    onRandom();
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search Pokemon by name or ID..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base bg-white border-2 border-red-200 focus:border-red-500 rounded-full"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="h-12 px-6 bg-red-600 hover:bg-red-700 rounded-full font-semibold"
        >
          Search
        </Button>
        <Button
          type="button"
          onClick={handleRandom}
          disabled={isLoading}
          variant="outline"
          className="h-12 px-4 border-2 border-red-200 hover:border-red-500 hover:bg-red-50 rounded-full"
        >
          <Shuffle className="h-4 w-4" />
        </Button>
      </form>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Try searching: <span className="font-medium">pikachu</span>, <span className="font-medium">25</span>, <span className="font-medium">charizard</span>
        <br />
        <span className="text-xs text-gray-400">Powered by Fastify Backend with Cache</span>
      </div>
    </div>
  );
};