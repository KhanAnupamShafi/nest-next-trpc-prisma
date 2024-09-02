// components/PokemonFetcher.tsx
import PokemonSelector, { PokemonData } from './PokemonSelector';

interface PokemonFetcherProps {
  greeting: {
    greeting: string;
  };
  pokemonData: PokemonData;
}

export default function PokemonFetcher({
  greeting,
  pokemonData,
}: PokemonFetcherProps) {
  const pokemonNames = [
    'bulbasaur',
    'ivysaur',
    'venusaur',
    'charmander',
    'charmeleon',
    'charizard',
    'squirtle',
    'wartortle',
    'blastoise',
    'caterpie',
    'metapod',
    'butterfree',
    'weedle',
    'kakuna',
    'beedrill',
    'pidgey',
    'pidgeotto',
    'pidgeot',
    'rattata',
    'raticate',
  ];

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">{greeting.greeting}</h1>

      <PokemonSelector pokemonNames={pokemonNames} initialData={pokemonData} />
    </div>
  );
}
