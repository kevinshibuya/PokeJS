import { NavLink } from "react-router-dom";
import { usePokedex } from "../../hooks/usePokedex";
import { PokemonData } from "../../types/global";

import { Container, Types } from "./styles";

interface CardsProps {
  pokemonData: PokemonData;
}

export function Cards({pokemonData}: CardsProps) {
  const { setPokemonDetails } = usePokedex();
  const storagedFavoritePokemons = localStorage.getItem('@PokeJS:favorites');
  let loadedFavoritePokemons: PokemonData[] = [];

  if (storagedFavoritePokemons) {
    loadedFavoritePokemons = JSON.parse(storagedFavoritePokemons);
  }

  const usedPokemonData = loadedFavoritePokemons[loadedFavoritePokemons.findIndex(favoritePokemon => favoritePokemon.data.name === pokemonData.data.name)] ? loadedFavoritePokemons[loadedFavoritePokemons.findIndex(favoritePokemon => favoritePokemon.data.name === pokemonData.data.name)] : pokemonData;

  return (
    <Container>
      <NavLink to="/pokemon" onClick={() => setPokemonDetails(usedPokemonData)}>
        <div className="img">
          <img src={usedPokemonData.data.sprites.versions["generation-v"]["black-white"].animated.front_default ? usedPokemonData.data.sprites.versions["generation-v"]["black-white"].animated.front_default : usedPokemonData.data.sprites.front_default} alt={usedPokemonData.data.name} />
        </div>
        <h1 className="id">
          Nº{usedPokemonData.data.id}
        </h1>
        <h1 className="name">
          {usedPokemonData.data.name}
        </h1>
        <div className="types">
          {usedPokemonData.data.types.map(type => {
            return (
              <Types key={type.type.name} className={`type ` + type.type.name } type={type.type.name}>{type.type.name.toUpperCase()}</Types>
            )
          })}
        </div>
      </NavLink>
    </Container>
  )
}