'use client';

import { trpc } from '@web/app/trpc';
import { useState } from 'react';

interface PokemonAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

interface PokemonCries {
  latest: string;
  legacy: string;
}

interface PokemonSprites {
  front_default: string | null;
  front_female: string | null;
}

export interface PokemonData {
  name: string;
  abilities: PokemonAbility[];
  base_experience: number;
  cries: PokemonCries;
  sprites: {
    other: {
      dream_world: PokemonSprites;
    };
  };
}

interface PokemonSelectorProps {
  pokemonNames: string[];
  initialData: PokemonData;
}

export default function PokemonSelector({
  pokemonNames,
  initialData,
}: PokemonSelectorProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(
    initialData.name,
  );
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(
    initialData,
  );

  const fetchPokemonData = async (name: string) => {
    const data = await trpc.getByName.query({ name });
    setPokemonData(data);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {pokemonNames.map((name) => (
          <button
            key={name}
            onClick={() => {
              setSelectedPokemon(name);
              fetchPokemonData(name);
            }}
            className={`btn w-full text-white py-2 px-4 rounded ${
              selectedPokemon === name
                ? 'bg-green-500'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </button>
        ))}
      </div>

      {pokemonData && (
        <div className="bg-slate-500 shadow-lg rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">
            {pokemonData.name.toUpperCase()}
          </h2>

          <div className="mb-4">
            <h3 className="text-lg font-medium">Abilities:</h3>
            <ul className="list-disc list-inside">
              {pokemonData.abilities.map((ability, index) => (
                <li key={index} className="text-orange-200">
                  {ability.ability.name}{' '}
                  {ability.is_hidden && (
                    <span className="text-sm text-orange-500">(Hidden)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium">Base Experience:</h3>
            <p className="text-pink-400">{pokemonData.base_experience}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium">Sprite:</h3>
            {pokemonData.sprites.other.dream_world.front_default && (
              <img
                src={pokemonData.sprites.other.dream_world.front_default}
                alt={pokemonData.name}
                className="w-32 h-32 mx-auto"
              />
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium">Cries:</h3>
            <div className="flex flex-col space-y-2">
              <audio key={pokemonData.cries.latest} controls className="w-full">
                <source src={pokemonData.cries.latest} type="audio/ogg" />
                Your browser does not support the audio element.
              </audio>
              <audio key={pokemonData.cries.legacy} controls className="w-full">
                <source src={pokemonData.cries.legacy} type="audio/ogg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
