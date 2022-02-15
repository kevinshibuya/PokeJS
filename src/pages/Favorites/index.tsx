import { useEffect, useMemo, useState } from "react"

import { Cards } from "../../components/Cards";
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { PaginationNumbers } from '../../components/PaginationNumbers';
import { usePokedex } from "../../hooks/usePokedex";
import { PokemonData } from "../../types/global";

import { Container } from "./styles";

export function Favorites() {
  const { favoritePokemondData } = usePokedex();

  return (
    <Container>
      <div className="cards">
        {favoritePokemondData.map(data => {
          return (
            <Cards key={data.data.id} pokemonData={data}></Cards>
          )
        })}
      </div>
    </Container>
  )
}