// PokemonCard.jsx
import graphImg from '../../assets/graph_1.png';
export const PokemonCard = ({ pokemon }) => {
    const imageUrl = pokemon.sprites?.other?.dream_world?.front_default || 
                    pokemon.sprites?.front_default || 
                    "/dist/graph_1.png";
    const types = pokemon.types?.map(type => type.type?.name).join(", ");   
    
    const stats = pokemon.stats?.map(stat => stat.stat?.name).slice(0, 1).join(", ") || "N/A";
    const abilities = pokemon.abilities?.map(abilitiesInfo => abilitiesInfo.ability?.name).slice(0, 1).join(", ") || "N/A"; 
    
    return (
      <div className="bg-white rounded-md shadow-md hover:shadow-[#afaaa2] hover:shadow-2xl shadow-[#b4b2b2] py-4 px-2 group transition-all duration-300 ease-in-out">
        <div className="flex flex-col items-center h-20 md:h-32 w-full relative">
          <img
            src={graphImg}
            alt="pokemon background"
            className="object-cover absolute inset-0 mt-4 w-full h-full transform transition-transform duration-200 ease-in group-hover:opacity-50"

          />
          <figure className="z-10 mt-3 relative h-full flex items-center">
            <img
              src={imageUrl}
              alt={pokemon.name}
              className="object-contain h-full transform transition-transform duration-300 ease-in-out group-hover:scale-110"
              onError={(e) => {
                e.target.src = "/dist/graph_1.png";
              }}
            />
          </figure>
        </div>
        
        <h1 className="text-xl font-bold text-center font-poppin capitalize mt-5">
          {pokemon.name}
        </h1>
        
        <div className="flex justify-center mt-3">
          <button className="md:px-8 px-4 py-1 bg-blue-950 text-xs text-white rounded-xl hover:bg-blue-800 transition-colors">{ types } </button>
        </div>


        <div className="flex flex-wrap justify-center gap-2 mt-4 mb-2">
          <p className="text-black text-xs font-bold text-center capitalize">
            Height: <span className="font-normal">{pokemon.height / 10}m</span>
          </p>
          <p className="text-black text-xs font-bold text-center capitalize">
            Weight: <span className="font-normal">{pokemon.weight / 10}kg</span>
          </p>
          <p className="text-black text-xs font-bold text-center capitalize">
            Speed: <span className="font-normal">{pokemon.stats?.[5]?.base_stat || 'N/A'}</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-4 mb-2">
          <p className="text-black text-xs font-bold text-center capitalize">
           Experience: <span className="font-normal">{pokemon.base_experience }</span>
          </p>
          <p className="text-black text-xs font-bold text-center capitalize">
            Attack: <span className="font-normal">{ stats }</span>
          </p>
          <p className="text-black text-xs font-bold text-center capitalize">
            Abilities: <span className="font-normal">{ abilities }</span>
          </p>
        </div>
      </div>
    );
  };