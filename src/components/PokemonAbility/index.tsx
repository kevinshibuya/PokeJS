import { useState, useEffect } from "react";
import { usePokedex } from "../../hooks/usePokedex";
import { api } from "../../services/api";
import { Container } from "./styles";

interface PokemonAbilitiesDetails {
  name: string;
  description: string;
  isVisible: boolean;
};

interface PokemonAbilityProps {
  ability: {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
  }
}

export function PokemonAbility({ ability }: PokemonAbilityProps) {
  const [pokemonAbilitiesDetails, setPokemonAbilitiesDetails] = useState<PokemonAbilitiesDetails[]>([]);
  const { pokemonDetails } = usePokedex();

  useEffect(() => {
    async function fetchData() {
      const pokemonAbilitiesDetails = [];

      for (let i = 0; i < pokemonDetails.data.abilities.length; i++) {
        pokemonAbilitiesDetails.push(await api.get(pokemonDetails.data.abilities[i].ability.url)
          .then((data) => {
            return {
              name: data.data.name,
              description: data.data.effect_entries[data.data.effect_entries.findIndex((data: any) => data.language.name === 'en')] ? data.data.effect_entries[data.data.effect_entries.findIndex((data: any) => data.language.name === 'en')].effect : 'No description found.',
              isVisible: false
            }
          })
        )
      }

      setPokemonAbilitiesDetails(pokemonAbilitiesDetails);
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleDescriptionVisibility(data: PokemonAbilitiesDetails) {
    let updatedPokemonAbilitiesDetails = [...pokemonAbilitiesDetails];
    updatedPokemonAbilitiesDetails[updatedPokemonAbilitiesDetails.findIndex(pokemonAbility => data.name === pokemonAbility.name)].isVisible = !data.isVisible;
    setPokemonAbilitiesDetails(updatedPokemonAbilitiesDetails);
  }

  return (
    <Container isHidden={ability.is_hidden} isVisible={pokemonAbilitiesDetails.length === 0 ? false : pokemonAbilitiesDetails[pokemonAbilitiesDetails.findIndex(data => data.name === ability.ability.name)].isVisible}>
      <div onClick={() => toggleDescriptionVisibility(pokemonAbilitiesDetails[pokemonAbilitiesDetails.findIndex(data => data.name === ability.ability.name)])}>
        {ability.ability.name}
      </div>
      <div className="tooltip">
        {pokemonAbilitiesDetails.length === 0 ? '' : pokemonAbilitiesDetails[pokemonAbilitiesDetails.findIndex(data => data.name === ability.ability.name)].description}
      </div>
    </Container>
  )
}