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

  const { isLoading, setIsLoading, pageNumbers, setPageNumbers, data, setData, getAmount, setGetAmount, cardAmount } = usePokedex();

  useEffect(() => {
    async function fetchData() {
      const data: PaginationData = await api.get(`/pokemon/?offset=${getAmount.amount}&limit=${getAmount.limit}`)
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

    fetchData()

    async function fetchPokeDetails() {
      const paginationDataNow: PaginationData = await fetchData();
      let pokemonData: PokemonData[] = [];
      for (let i = 0; i < getAmount.limit; i++) {
        pokemonData.push(await api.get(paginationDataNow.results[i].url)
          .then(data => {
            return {
              isLoading: false,
              data: data.data
            }
          }))
      }

      setIsLoading(pokemonData[0].isLoading);
      setData(pokemonData);
      console.log(pokemonData);
      return pokemonData;
    }

    fetchPokeDetails();
  }, [getAmount, setData, setIsLoading]);

  function changePage(direction: string) {
    if (direction === 'next') {
      setIsLoading(true);
      setGetAmount({
        amount: getAmount.amount + cardAmount,
        limit: cardAmount
      });
      setPageNumbers({
        first: pageNumbers.first + 1,
        last: pageNumbers.last + 1
      });
    } else if (direction === 'prev' && getAmount.amount >= cardAmount) {
      setIsLoading(true);
      setGetAmount({
        amount: getAmount.amount - cardAmount,
        limit: cardAmount
      });
      setPageNumbers({
        first: pageNumbers.first + -1,
        last: pageNumbers.last + -1
      });
    } else if (direction === 'last') {
      setIsLoading(true);
      setGetAmount({
        amount: (Math.floor(paginationData.count / cardAmount)) * cardAmount,
        limit: paginationData.count - (Math.floor(paginationData.count / cardAmount)) * cardAmount
      });
      setPageNumbers({
        first: Math.floor(paginationData.count / cardAmount),
        last: 5
      });
    } else if (direction === 'first') {
      setIsLoading(true);
      setGetAmount({
        amount: 0,
        limit: cardAmount
      });
      setPageNumbers({
        first: 1,
        last: 5
      });
    }
  }

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
      <PaginationNumbers changePageFunction={changePage} count={paginationData.count} amount={{getAmount, setGetAmount, cardAmount}} />
    </Container>
  )
}