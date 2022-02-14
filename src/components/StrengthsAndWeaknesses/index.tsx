import { usePokedex } from "../../hooks/usePokedex";
import { Container } from "./styles";

export function StrenghtsAndWeaknesses() {
  const { pokemonDetails } = usePokedex();
  
  const typeChart = [
    {
      name: 'normal',
      strong: [],
      weak: ['fighting'],
      immune: ['ghost']
    },
    {
      name: 'fire',
      strong: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
      weak: ['water', 'ground', 'rock'],
      immune: []
    },
    {
      name: 'water',
      strong: ['fire', 'water', 'ice', 'steel'],
      weak: ['electric', 'grass'],
      immune: []
    },
    {
      name: 'electric',
      strong: ['electric', 'flying', 'steel'],
      weak: ['ground'],
      immune: []
    },
    {
      name: 'grass',
      strong: ['water', 'electric', 'grass', 'ground'],
      weak: ['fire', 'ice', 'poison', 'flying', 'bug'],
      immune: []
    },
  ];
  
  return (
    <Container>
      <div className="strenghts">
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
    </div>
    </Container>
  )
}