import { useEffect, useState } from "react";
import { usePokedex } from "../../hooks/usePokedex";
import { NavLink } from "react-router-dom";
import { api } from "../../services/api";
import { PokemonData } from "../../types/global";
import { LoadingIndicator } from "../../components/LoadingIndicator";

import { Container } from "./styles";

export function Pokemon() {
  const [ japaneseName, setJapaneseName ] = useState('');
  const { pokemonDetails, isLoading, setIsLoading } = usePokedex();

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const name = await api.get(pokemonDetails.species.url)
        .then(data => data.data.names);

      setJapaneseName(name[name.findIndex((data: any) => data.language.name === 'ja')].name);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  console.log(pokemonDetails);

  return (
    <>
      { isLoading ? <LoadingIndicator /> : 
        <Container>
          <NavLink to="/">return</NavLink>
          <div className="pokemon-about">
            <h1 className="pokemon-id">#{pokemonDetails.id}</h1>
            <h1 className="pokemon-name">{pokemonDetails.name}</h1>
            <h1 className="pokemon-name japanese">{japaneseName}</h1>
            <div className="img">
              <img src={pokemonDetails.sprites.other["official-artwork"].front_default} alt={pokemonDetails.name} />
            </div>
          </div>
          <div className="pokemon-details">
    
          </div>
        </Container>
      }
    </>
  )
}