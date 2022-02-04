import { PokemonData } from "../../types/global";
import { Container } from "./styles";

interface CardsProps {
  pokemonData: PokemonData;
}

export function Cards({pokemonData}: CardsProps) {
  return (
    <Container>
      <div className="img">
        <img src={pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default} alt={pokemonData.name} />
      </div>
      <h1 className="id">
        Nº{pokemonData.id}
      </h1>
      <h1 className="name">
        {pokemonData.name}
      </h1>
      <div className="types">
        {pokemonData.types.map(type => {
          return (
            <div key={type.type.name} className={`type ` + type.type.name }>{type.type.name.toUpperCase()}</div>
          )
        })}
      </div>
    </Container>
  )
}