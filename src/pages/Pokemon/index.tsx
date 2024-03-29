import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { usePalette } from 'react-palette';
import { animated, useSpring, config } from 'react-spring';

import { usePokedex } from "../../hooks/usePokedex";
import { api } from "../../services/api";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { PokemonAbility } from "../../components/PokemonAbility"
import { StrenghtsAndWeaknesses } from "../../components/StrengthsAndWeaknesses";

import { Container, Types, PokemonStats } from "./styles";
import returnSvg from "../../assets/return.svg";
import isFavorite from "../../assets/filled-star.png";
import notFavorite from "../../assets/empty-star.png";

interface MorePokemonData {
  flavorTextEntry: string;
  japaneseName: string;
  genera: string;
}


export function Pokemon() {
  const [morePokemonData, setMorePokemonData] = useState<MorePokemonData>({} as MorePokemonData);
  const [screenScrollHeight, setScreenScrollHeight] = useState(document.body.scrollHeight);
  const { pokemonDetails, togglePokemonFavorite } = usePokedex();

  const pokemonOfficialSprite = pokemonDetails.data.sprites.other["official-artwork"].front_default;
  const pokemonHomeSprite = pokemonDetails.data.sprites.other.home.front_default;
  const { data, loading } = usePalette(pokemonOfficialSprite ? pokemonOfficialSprite : pokemonHomeSprite);


  useEffect(() => {
    async function fetchData() {
      const morePokemonData = await api.get(pokemonDetails.data.species.url)
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

  useEffect(() => {
    setScreenScrollHeight(document.body.scrollHeight);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, morePokemonData, document.body.scrollHeight, document.body.scrollWidth]);

  const animateBackground = useSpring({
    from: { background: '#F6F8FC' },
    to: { background: data.vibrant },
    config: {...config.gentle}
  });
  
  const animateOpacity = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 250,
    config: {...config.gentle}
  });

  const animateEnterRight = useSpring({
    from: { marginRight: '-50%', opacity: 0 },
    to: { marginRight: '0%', opacity: 1 },
    delay: 500,
    config: {...config.gentle}
  });
  
  const animateEnterLeft = useSpring({
    from: { marginLeft: '-50%', opacity: 0 },
    to: { marginLeft: '0%', opacity: 1 },
    delay: 500,
    config: {...config.gentle}
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

  const statsTotal = pokemonDetails.data.stats.reduce((acc, cur) => {
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
          <animated.div style={animateOpacity} className="title-wrapper">
            <NavLink to="/">
              Return 
              <img src={returnSvg} alt="return icon" />
            </NavLink>
            <h1 className="pokemon-id">#{pokemonDetails.data.id}</h1>
            <h1 className="pokemon-name">{pokemonDetails.data.name}</h1>
          </animated.div>
          <div className="wrapper">
            <animated.div style={animateEnterLeft} className="pokemon-landing">
              <div className="img official-artwork">
                <h1 className="pokemon-name japanese">{morePokemonData.japaneseName}</h1>
                <button className="favorite" onClick={() => togglePokemonFavorite(pokemonDetails)}>
                  <img src={pokemonDetails.isFavorite ? isFavorite : notFavorite} alt="favorite icon" />
                </button>
                <img src={pokemonOfficialSprite ? pokemonOfficialSprite : pokemonHomeSprite} alt={pokemonDetails.data.name} />
              </div>
            </animated.div>
            <animated.div style={animateEnterRight} className="pokemon-details">
              <div className="pokemon-genus pokemon-wrapper">
                <h1 className="title">
                  {morePokemonData.genera ? morePokemonData.genera : 'POKÉMON'}
                </h1>
                <div className="types">
                  {pokemonDetails.data.types.map(type => {
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
                  {pokemonDetails.data.abilities.map(ability => {
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
                    {formatData(pokemonDetails.data.height.toString())}m
                  </div>
                </div>
                <div className="weight">
                  <h1 className="title">
                    Weight
                  </h1>
                  <div className="content">
                    {formatData(pokemonDetails.data.weight.toString())}kg
                  </div>
                </div>
              </div>
              <div className="data second pokemon-wrapper">
                <StrenghtsAndWeaknesses />
              </div>
              <div className="pokemon-stats pokemon-wrapper">
                <h1 className="title">
                  Stats
                </h1>
                <div className="content">
                  {pokemonDetails.data.stats.map((stat, index) => {
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
            </animated.div>
          </div>
        </Container>
      }
    </>
  )
}