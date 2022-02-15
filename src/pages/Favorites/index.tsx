import { Cards } from "../../components/Cards";
import { usePokedex } from "../../hooks/usePokedex";

import { Container } from "./styles";

export function Favorites() {
  const { favoritePokemondData } = usePokedex();

  return (
    <Container>
      {
        favoritePokemondData.length === 0 ?
          <div className="no-pokemon">No pokemon has been added to favorites</div> :
          <div className="cards">
            {favoritePokemondData.map(data => {
              return (
                <Cards key={data.data.id} pokemonData={data}></Cards>
              )
            })}
          </div>
      }
    </Container>
  )
}