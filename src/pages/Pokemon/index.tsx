import { useEffect, useState } from "react";
import { usePokedex } from "../../hooks/usePokedex";
import { NavLink } from "react-router-dom";
import { api } from "../../services/api";
import { PokemonData } from "../../types/global";
import { LoadingIndicator } from "../../components/LoadingIndicator";

import { Container, PokemonAbility, Types, PokemonStats } from "./styles";

interface MorePokemonData {
  flavorTextEntry: string;
  japaneseName: string;
  genera: string;
}

export function Pokemon() {
  const [morePokemonData, setMorePokemonData] = useState<MorePokemonData>({} as MorePokemonData);
  const { pokemonDetails, isLoading, setIsLoading } = usePokedex();

  const pokeStatsTitles = [
    {
      name: 'HP',
      color: '#DF2240',
    }, 
    {
      name: 'ATK',
      color: '#FF994D',
    }, 
    {
      name: 'DEF',
      color: '#FFDC49',
    }, 
    {
      name: 'SpA',
      color: '#87DDFF',
    }, 
    {
      name: 'SpD',
      color: '#A8EF90',
    }, 
    {
      name: 'SPD',
      color: '#FB96A9',
    }, 
    {
      name: 'TOT',
      color: '#7595DB',
    }
  ]

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const morePokemonData = await api.get(pokemonDetails.species.url)
        .then(data => {
          return {
            flavor_text_entries: data.data.flavor_text_entries,
            names: data.data.names,
            genera: data.data.genera,
          }
        });

      setMorePokemonData({
        japaneseName: morePokemonData.names[morePokemonData.names.findIndex((data: any) => data.language.name === 'ja')].name,
        flavorTextEntry: morePokemonData.flavor_text_entries[morePokemonData.flavor_text_entries.findIndex((data: any) => data.language.name === 'en')].flavor_text,
        genera: morePokemonData.genera[morePokemonData.genera.findIndex((data: any) => data.language.name === 'en')].genus,
      });

      setIsLoading(false);
      console.log(pokemonDetails);
    }

    fetchData();
  }, [pokemonDetails]);

  const statsTotal = pokemonDetails.stats.reduce((acc, cur) => {
    return {
      base_stat: acc.base_stat + cur.base_stat,
      stat: {
        name: cur.stat.name
      }
    }
  });

  function formatData(data: string) {
    const firstPart = data.toString().substring(0, data.toString().length - 1) ? data.toString().substring(0, data.toString().length - 1) : 0;
    const dataFormatted = firstPart + `.` + data.toString().substring(data.toString().length - 1);

    return dataFormatted;
  }

  return (
    <>
      {isLoading ? <LoadingIndicator /> :
        <Container>
          <h1 className="pokemon-id">#{pokemonDetails.id}</h1>
          <h1 className="pokemon-name">{pokemonDetails.name}</h1>
          <NavLink to="/">return</NavLink>
          <div className="wrapper">
            <div className="pokemon-landing">
              <div className="img official-artwork">
                <h1 className="pokemon-name japanese">{morePokemonData.japaneseName}</h1>
                <img src={pokemonDetails.sprites.other["official-artwork"].front_default ? pokemonDetails.sprites.other["official-artwork"].front_default : pokemonDetails.sprites.other.home.front_default} alt={pokemonDetails.name} />
              </div>
            </div>
            <div className="pokemon-details">
              <div className="pokemon-genus">
                <h1 className="title">
                  {morePokemonData.genera}
                </h1>
                <div className="types">
                  {pokemonDetails.types.map(type => {
                    return (
                      <Types key={type.type.name} className={`type ` + type.type.name} type={type.type.name}>{type.type.name.toUpperCase()}</Types>
                    )
                  })}
                </div>
              </div>
              <div className="pokemon-entry">
                <h1 className="title">
                  Pokedex Entry
                </h1>
                <h1 className="content">
                  {morePokemonData.flavorTextEntry}
                </h1>
              </div>
              <div className="abilities">
                <h1 className="title">
                  Abilities
                </h1>
                <div className="content">
                  {pokemonDetails.abilities.map(ability => {
                    return (
                      <PokemonAbility isHidden={ability.is_hidden}>
                        {ability.ability.name}
                      </PokemonAbility>
                    )
                  })}
                </div>
              </div>
              <div className="data">
                <div className="height">
                  <h1 className="title">
                    Height
                  </h1>
                  <div className="content">
                    {formatData(pokemonDetails.height.toString())}m
                  </div>
                </div>
                <div className="weight">
                  <h1 className="title">
                    Weight
                  </h1>
                  <div className="content">
                    {formatData(pokemonDetails.weight.toString())}kg
                  </div>
                </div>
                {/* <div className="strenghts">
                <h1 className="title">
                  Strenghts
                </h1>
                <div className="content">
                  {pokemonDetails.base_experience}
                </div>
              </div>
              <div className="weaknesses">
                <h1 className="title">
                  Weaknesses
                </h1>
                <div className="content">
                  {pokemonDetails.base_experience}
                </div>
              </div> */}
              </div>
              <div className="pokemon-stats">
                <h1 className="title">
                  Stats
                </h1>
                <div className="content">
                  {pokemonDetails.stats.map((stat, index) => {
                    return (
                      <PokemonStats className="stat" statName={pokeStatsTitles[index]}>
                        <div className="stat-title">
                          {pokeStatsTitles[index].name}
                        </div>
                        {stat.base_stat}
                      </PokemonStats>
                    )
                  })}
                  <div className="stat total">
                    <div className="stat-title total">
                      TOT
                    </div>
                    {statsTotal.base_stat}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      }
    </>
  )
}