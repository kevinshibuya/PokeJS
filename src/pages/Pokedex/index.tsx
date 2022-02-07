import { useEffect, useState } from "react"

import { Cards } from "../../components/Cards";
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { PaginationNumbers } from '../../components/PaginationNumbers';
import { usePokedex } from "../../hooks/usePokedex";
import { api } from "../../services/api";
import { PokemonData } from "../../types/global";

import { Container } from "./styles"

interface PaginationData {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string; }[];
}

export function Pokedex() {
  const [paginationData, setPaginationData] = useState<PaginationData>({} as PaginationData);
  const [search, setSearch] = useState('');

  const { isLoading, setIsLoading, data, setData, dataAmount, setDataAmount } = usePokedex();

  function searchFilter(value: { name: string; url: string; }) {
    return value.name.includes(search);
  }

  useEffect(() => {
    async function fetchData() {
      const limitAmount: number = await api.get(`/pokemon`)
        .then(data => data.data.count)
      const data: PaginationData = await api.get(`/pokemon/?offset=0&limit=${limitAmount}`)
        .then(data => data.data)


      setPaginationData({
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: data.results
      });

      console.log(data);
      return data;
    }

    fetchData();

  }, []);

  useEffect(() => {
    async function fetchPokemonData() {
      const filteredDataResults = paginationData.results.filter(searchFilter);

      const dataLimit = filteredDataResults.length > dataAmount.dataLimit ? dataAmount.dataLimit : filteredDataResults.length;
      let pokemonData: PokemonData[] = [];
      
      for (let i = 0; i < dataLimit; i++) {
        pokemonData.push(await api.get(filteredDataResults[i].url)
          .then(data => {
            return {
              isLoading: false,
              data: data.data
            }
          })
        )
      }

      setIsLoading(pokemonData[0].isLoading);
      setData(pokemonData);
      console.log(pokemonData);
      return pokemonData;
    }

    fetchPokemonData();
  }, [search, paginationData]);

  function changeSearch(value: string) {
    console.log(value);
    setSearch(value);
  }

  return (
    <Container>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search your Pokemon!"
          onChange={(e) => changeSearch(e.target.value)}
        />
      </div>
      <div className="cards">
        {isLoading ? <LoadingIndicator /> : data.map(data => {
          return (
            <Cards key={data.data.id} pokemonData={data.data}></Cards>
          )
        })}
      </div>
      <PaginationNumbers count={paginationData.count} />
    </Container>
  )
}