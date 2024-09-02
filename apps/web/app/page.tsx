// app/page.tsx
import { fetchPokemonData } from '@web/app/action/fetchPokemon';
import PokemonFetcher from '@web/app/components/PokemonFetcher';
import { trpc } from '@web/app/trpc';

export default async function Home() {
  const greeting = await trpc.getUsers.query({
    name: 'Anupam from backend 💚',
  });

  // Fetching Pokémon data using server action
  const pokemonData = await fetchPokemonData('ivysaur');

  return <PokemonFetcher greeting={greeting} pokemonData={pokemonData} />;
}
