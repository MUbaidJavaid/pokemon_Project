import { useEffect, useState, useCallback } from "react";
import { PokemonCard } from "./pokemonCart.jsx"; // Adjust the import path as necessary
export const PokemonData = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPokemonData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=600");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      // console.log("Fetched Pokémon data:", data.results);
      // Fetch only basic data first
      const basicData = data.results.map((pokemon, index) => ({
        name: pokemon.name,
        url: pokemon.url,
        id: index + 1 // Temporary ID until we fetch details
      }));
      // console.log("Basic Pokémon data:", basicData);
      setPokemonData(basicData);
      
      // Then fetch details in background
      const pokemonDetails = await Promise.all(
        basicData.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          if (!pokemonResponse.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
          return pokemonResponse.json();
        })
      );
      
      setPokemonData(pokemonDetails);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message || "Failed to fetch Pokémon data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);
console.log("Pokemon data:", pokemonData);
  const filteredPokemon = pokemonData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && pokemonData.length === 0) {
    return (
      <div className="text-black flex flex-col items-center p-4 mx-auto my-auto">
        <p className="md:text-4xl text-2xl my-6 font-bold text-center  font-poppin_bold capitalize">
          Loading Pokémon...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-800 flex flex-col items-center p-4 mx-auto mt-10 mb-10">
        <p className="md:text-4xl text-2xl my-6 font-bold text-center font-poppin_bold capitalize">
          Error: {error}
        </p>
        <button 
          onClick={fetchPokemonData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <div className="text-black flex flex-col items-center">
        <h1 className="md:text-4xl text-2xl my-6 font-bold text-center font-poppin_bold capitalize">
          Let's Catch Pokémon
        </h1>
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mx-auto py-3 px-5 w-80 text-gray-700 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent shadow-sm transition-all duration-200"
        />
        
        {filteredPokemon.length === 0 ? (
          <p className="mt-10 text-xl">No Pokémon found matching "{searchTerm}"</p>
        ) : (
          <div className="mt-10 md:mx-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};