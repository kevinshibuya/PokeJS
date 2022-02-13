import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { usePalette } from 'react-palette';
import { animated, useSpring } from 'react-spring';

import { usePokedex } from "../../hooks/usePokedex";
import { api } from "../../services/api";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { PokemonAbility } from "../../components/PokemonAbility"

import { Container, Types, PokemonStats } from "./styles";

interface MorePokemonData {
  flavorTextEntry: string;
  japaneseName: string;
  genera: string;
}


export function Pokemon() {
  const [morePokemonData, setMorePokemonData] = useState<MorePokemonData>({} as MorePokemonData);
  const { pokemonDetails, screenScrollHeight } = usePokedex();

  const pokemonOfficialSprite = pokemonDetails.sprites.other["official-artwork"].front_default;
  const pokemonHomeSprite = pokemonDetails.sprites.other.home.front_default;
  const { data, loading } = usePalette(pokemonOfficialSprite ? pokemonOfficialSprite : pokemonHomeSprite);

  const animateBackground = useSpring({
    from: { background: '#F6F8FC' },
    to: { background: data.vibrant },
    leave: { background: '#F6F8FC' },
    delay: 200
  });

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
        genera: morePokemonData.genera[morePokemonData.genera.findIndex((data: any) => data.language.name === 'en')].genus
      });
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
      {loading ? <LoadingIndicator /> :
        <Container screenScrollHeight={screenScrollHeight}>
          <animated.div style={animateBackground} className="background-wrapper"></animated.div>
          <div className="title-wrapper">
            <NavLink to="/">return</NavLink>
            <h1 className="pokemon-id">#{pokemonDetails.id}</h1>
            <h1 className="pokemon-name">{pokemonDetails.name}</h1>
          </div>
          <div className="wrapper">
            <div className="pokemon-landing">
              <div className="img official-artwork">
                <h1 className="pokemon-name japanese">{morePokemonData.japaneseName}</h1>
                <img src={pokemonOfficialSprite ? pokemonOfficialSprite : pokemonHomeSprite} alt={pokemonDetails.name} />
              </div>
            </div>
            <div className="pokemon-details">
              <div className="pokemon-genus pokemon-wrapper">
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
              <div className="pokemon-entry pokemon-wrapper">
                <h1 className="title">
                  Pokedex Entry
                </h1>
                <h1 className="content">
                  {morePokemonData.flavorTextEntry}
                </h1>
              </div>
              <div className="abilities pokemon-wrapper">
                <h1 className="title">
                  Abilities
                </h1>
                <div className="content">
                  {pokemonDetails.abilities.map(ability => {
                    return (
                      <PokemonAbility key={ability.ability.name} ability={ability} />
                    )
                  })}
                </div>
              </div>
              <div className="data pokemon-wrapper">
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
              <div className="pokemon-stats pokemon-wrapper">
                <h1 className="title">
                  Stats
                </h1>
                <div className="content">
                  {pokemonDetails.stats.map((stat, index) => {
                    return (
                      <PokemonStats key={stat.stat.name} className="stat" statName={pokeStatsTitles[index]}>
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