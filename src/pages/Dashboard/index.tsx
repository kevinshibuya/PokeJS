import { useEffect, useState } from "react"

import { Cards } from "../../components/Cards";
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { PaginationNumbers } from '../../components/PaginationNumbers';
import { usePagination } from "../../hooks/usePagination";
import { api } from "../../services/api";
import { PokemonData } from "../../types/global";

import { Container } from "./styles"

interface PaginationData {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string; }[];
}

interface GetAmountData {
  amount: number;
  limit: number;
}


export function Dashboard() {
  const [data, setData] = useState<PokemonData[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationData>({} as PaginationData);
  const [getAmount, setGetAmount] = useState<GetAmountData>({
    amount: 0,
    limit: 21
  });
  const { isLoading, setIsLoading, pageNumbers, setPageNumbers } = usePagination();

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
      return pokemonData;
    }

    fetchPokeDetails();
  }, [getAmount, setIsLoading]);

  function changePage(direction: string) {
    if (direction === 'next') {
      setIsLoading(true);
      setGetAmount({
        amount: getAmount.amount + 21,
        limit: 21
      });
      setPageNumbers({
        first: pageNumbers.first + 1,
        last: pageNumbers.last + 1
      });
    } else if (direction === 'prev' && getAmount.amount >= 21) {
      setIsLoading(true);
      setGetAmount({
        amount: getAmount.amount - 21,
        limit: 21
      });
      setPageNumbers({
        first: pageNumbers.first + -1,
        last: pageNumbers.last + -1
      });
    } else if (direction === 'last') {
      setIsLoading(true);
      setGetAmount({
        amount: (Math.floor(paginationData.count / 21)) * 21,
        limit: paginationData.count - (Math.floor(paginationData.count / 21)) * 21
      });
      setPageNumbers({
        first: Math.floor(paginationData.count / 21),
        last: 5
      });
    } else if (direction === 'first') {
      setIsLoading(true);
      setGetAmount({
        amount: 0,
        limit: 21
      });
      setPageNumbers({
        first: 1,
        last: 5
      });
    }
  }

  return (
    <Container>
      <div className="cards">
        {isLoading ? <LoadingIndicator /> : data.map(data => {
          return (
            <Cards key={data.data.id} pokemonData={data.data}></Cards>
          )
        })}
      </div>
      <PaginationNumbers changePageFunction={changePage} count={paginationData.count} amount={{getAmount, setGetAmount}} />
    </Container>
  )
}