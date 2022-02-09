import { useEffect, useMemo, useState } from "react"
import debounce from 'lodash.debounce';

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
  const [pageAmount, setPageAmount] = useState(0);

  const { isLoading, setIsLoading, data, setData, cardAmount, search, setSearch, pageNumbers } = usePokedex();

  useEffect(() => {
    async function fetchData() {
      const limitAmount: number = await api.get(`/pokemon`)
        .then(data => data.data.count);
      const data: PaginationData = await api.get(`/pokemon/?offset=0&limit=${limitAmount}`)
        .then(data => data.data);

      setPaginationData({
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: data.results
      });

      return data;
    }

    fetchData();

  }, []);

  function searchFilter(value: { name: string; url: string; }) {
    return value.name.includes(search);
  }

  useEffect(() => {
    async function fetchPokemonData() {
      const filteredDataResults = paginationData.results.filter(searchFilter);
      let pokemonData: PokemonData[] = [];

      const setMaxDataAmount = filteredDataResults.length > cardAmount * pageNumbers.first ? cardAmount * pageNumbers.first : filteredDataResults.length;
      const setMinDataAmount = cardAmount * (pageNumbers.first - 1) < 0 ? 0 : cardAmount * (pageNumbers.first - 1);

      if (setMaxDataAmount === 0) {
        setIsLoading(false);
        setData([]);
        return;
      }

      for (let i = setMinDataAmount; i < setMaxDataAmount; i++) {
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
      setPageAmount(Math.ceil(filteredDataResults.length / cardAmount));
      setData(pokemonData);

      return pokemonData;
    }

    fetchPokemonData();
  }, [search, paginationData, cardAmount, pageNumbers]);

  function changeSearch(event: any) {
    setIsLoading(true);
    setSearch(event.target.value);
  }

  const debounceChangeSearch = useMemo(() => {
    return debounce(changeSearch, 300);
  }, [])

  return (
    <Container>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search your Pokemon!"
          onChange={debounceChangeSearch}
        />
      </div>
      <div className="cards">
        {isLoading ? <LoadingIndicator /> : data.map(data => {
          return (
            <Cards key={data.data.id} pokemonData={data.data}></Cards>
          )
        })}
      </div>
      <PaginationNumbers pageAmount={pageAmount} search={search} />
    </Container>
  )
}