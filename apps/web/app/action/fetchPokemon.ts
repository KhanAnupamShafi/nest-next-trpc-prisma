// app/actions/pokemonActions.ts
'use server';

import { trpc } from '@web/app/trpc';

export async function fetchPokemonData(name: string) {
  const pokemonData = await trpc.getByName.query({ name });
  return pokemonData;
}
