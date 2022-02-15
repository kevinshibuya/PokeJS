import { useEffect, useState } from "react";
import { usePokedex } from "../../hooks/usePokedex";

import { TypeIcon } from "./styles";
import { Container } from "./styles";

type WeaknessesAndStrengths = {
  weaknesses: string[];
  strenghts: string[];
  superWeaknesses: string[];
  superStrengths: string[];
  immune: string[];
}

export function StrenghtsAndWeaknesses() {
  const [weaknessesAndStrengths, setWeaknessesAndStrengths] = useState<WeaknessesAndStrengths>({} as WeaknessesAndStrengths);
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
    {
      name: 'ice',
      strong: ['ice'],
      weak: ['fire', 'fighting', 'rock', 'steel'],
      immune: []
    },
    {
      name: 'fighting',
      strong: ['bug', 'rock', 'dark'],
      weak: ['flying', 'psychic', 'fairy'],
      immune: []
    },
    {
      name: 'poison',
      strong: ['grass', 'fighting', 'poison', 'bug', 'fairy'],
      weak: ['ground', 'psychic'],
      immune: []
    },
    {
      name: 'ground',
      strong: ['poison', 'rock'],
      weak: ['water', 'grass', 'ice'],
      immune: ['electric']
    },
    {
      name: 'flying',
      strong: ['grass', 'fighting', 'bug'],
      weak: ['electric', 'rock', 'ice'],
      immune: ['ground']
    },
    {
      name: 'psychic',
      strong: ['fighting', 'psychic'],
      weak: ['bug', 'rock', 'dark'],
      immune: []
    },
    {
      name: 'bug',
      strong: ['grass', 'fighting', 'ground'],
      weak: ['fire', 'flying', 'rock'],
      immune: []
    },
    {
      name: 'rock',
      strong: ['normal', 'fire', 'poison', 'flying'],
      weak: ['water', 'grass', 'fighting', 'ground', 'steel'],
      immune: []
    },
    {
      name: 'ghost',
      strong: ['poison', 'bug'],
      weak: ['ghost', 'dark'],
      immune: ['normal', 'fighting']
    },
    {
      name: 'dragon',
      strong: ['fire', 'water', 'electric', 'grass'],
      weak: ['ice', 'dragon', 'fairy'],
      immune: []
    },
    {
      name: 'dark',
      strong: ['ghost', 'dark'],
      weak: ['fighting', 'bug', 'fairy'],
      immune: ['psychic']
    },
    {
      name: 'steel',
      strong: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'],
      weak: ['fire', 'fighting', 'ground'],
      immune: ['poison']
    },
    {
      name: 'fairy',
      strong: ['fighting', 'bug', 'dark'],
      weak: ['poison', 'steel'],
      immune: ['dragon']
    },
  ];

  useEffect(() => {
    async function fetchData() {
      // get all the types data based on the pokemon types
      const allData = pokemonDetails.data.types.map(pokemonType => {
        return typeChart[typeChart.findIndex(type => type.name === pokemonType.type.name)]
      });

      // sets a mock second type data if the pokemon only has one type
      const secondData = allData[1] ? allData[1] : { immune: [], strong: [], weak: [] };

      // merge all the above in one object, with or without mock data
      const mergedData = {
        immune: [...allData[0].immune, ...secondData.immune],
        strong: [...allData[0].strong, ...secondData.strong],
        weak: [...allData[0].weak, ...secondData.weak],
      }

      // sets the array that will look for duplicates that become ultra-effective
      const duplicates: { immune: string[]; strong: string[]; weak: string[] } = { immune: [], strong: [], weak: [] };

      // checks if the pokemon is multi-type
      if (allData.length > 1) {
        // finds and pushes the ultra-effective types
        allData[0].strong.forEach(data => {
          secondData.strong.forEach(anotherData => {
            if (data === anotherData) duplicates.strong.push(data);
          });
        });

        allData[0].weak.forEach(data => {
          secondData.weak.forEach(anotherData => {
            if (data === anotherData) duplicates.weak.push(data);
          });
        });

        allData[0].immune.forEach(data => {
          secondData.immune.forEach(anotherData => {
            if (data === anotherData) duplicates.immune.push(data);
          });
        });
      }

      const nullishDuplicates: string[] = [];

      // checks if the pokemon is multi-type
      if (allData.length > 1) {
        // finds and pushes the types that nullifies one another
        allData[0].strong.forEach(data => {
          allData[1].weak.forEach(anotherData => {
            if (data === anotherData) nullishDuplicates.push(data);
          });
        });

        allData[0].weak.forEach(data => {
          allData[1].strong.forEach(anotherData => {
            if (data === anotherData) nullishDuplicates.push(data);
          });
        });

        allData.forEach(data => {
          nullishDuplicates.push(...data.immune)
        })
      }

      // filter the data that is already included on the ultra-effective duplicates, and removes it
      const filteredData = {
        immune: mergedData.immune.filter(data => {
          return duplicates.immune[duplicates.immune.findIndex(immuneData => immuneData === data)] === data ? undefined : data;
        }),
        strong: mergedData.strong.filter(data => {
          return duplicates.strong[duplicates.strong.findIndex(strongData => strongData === data)] === data ? undefined : data;
        }),
        weak: mergedData.weak.filter(data => {
          return duplicates.weak[duplicates.weak.findIndex(weakData => weakData === data)] === data ? undefined : data;
        }),
      }

      // filter the filtered data with the nullish types
      const nullishFilteredData = {
        immune: filteredData.immune,
        strong: filteredData.strong.filter(data => {
          return nullishDuplicates[nullishDuplicates.findIndex(nullishDuplicate => nullishDuplicate === data)] ? undefined : data;
        }),
        weak: filteredData.weak.filter(data => {
          return nullishDuplicates[nullishDuplicates.findIndex(nullishDuplicate => nullishDuplicate === data)] ? undefined : data;
        }),
      }

      // sets all values to the state
      setWeaknessesAndStrengths({
        weaknesses: [...nullishFilteredData.weak],
        strenghts: [...nullishFilteredData.strong],
        superWeaknesses: [...duplicates.weak],
        superStrengths: [...duplicates.strong],
        immune: [...nullishFilteredData.immune, ...duplicates.immune]
      })
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {Object.keys(weaknessesAndStrengths).length === 0 ? '' :
        <Container>
          {
            weaknessesAndStrengths.strenghts.length === 0 && weaknessesAndStrengths.superStrengths.length === 0 ? '' :
              <div className="strenghts">
                <h1 className="title">
                  Strenghts
                </h1>
                {weaknessesAndStrengths.strenghts.length !== 0 ?
                  <div className="content first">
                    <div className="title type-icon">1/2x</div>
                    {weaknessesAndStrengths.strenghts.map(strenght => {
                      return (
                        <TypeIcon className="type-icon" typeName={strenght} />
                      )
                    })}
                  </div> : ''}
                {weaknessesAndStrengths.superStrengths.length !== 0 ?
                  <div className="content">
                    <div className="title type-icon">1/4x</div>
                    {weaknessesAndStrengths.superStrengths.map(strenght => {
                      return (
                        <TypeIcon className="type-icon" typeName={strenght} />
                      )
                    })}
                  </div> : ''}
              </div>
          }
          {
            weaknessesAndStrengths.weaknesses.length === 0 && weaknessesAndStrengths.superWeaknesses.length === 0 ? '' :
              <div className="weaknesses">
                <h1 className="title">
                  Weaknesses
                </h1>
                {weaknessesAndStrengths.weaknesses.length !== 0 ?
                  <div className="content first">
                    <div className="title type-icon">2x</div>
                    {weaknessesAndStrengths.weaknesses.map(strenght => {
                      return (
                        <TypeIcon className="type-icon" typeName={strenght} />
                      )
                    })}
                  </div> : ''}
                {weaknessesAndStrengths.superWeaknesses.length !== 0 ?
                  <div className="content first">
                    <div className="title type-icon">4x</div>
                    {weaknessesAndStrengths.superWeaknesses.map(strenght => {
                      return (
                        <TypeIcon className="type-icon" typeName={strenght} />
                      )
                    })}
                  </div> : ''}
              </div>
          }
          {weaknessesAndStrengths.immune.length !== 0 ?
            <div className="immune">
              <h1 className="title">
                Immune
              </h1>
              <div className="content">
                <div className="title type-icon">0x</div>
                {weaknessesAndStrengths.immune.map(strenght => {
                  return (
                    <TypeIcon className="type-icon" typeName={strenght} />
                  )
                })}
              </div>
            </div> : ''}
        </Container>}
    </>
  )
}