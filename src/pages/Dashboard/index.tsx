import { useEffect, useState } from "react"

import { Cards } from "../../components/Cards";
import { LoadingIndicator } from '../../components/LoadingIndicator';
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
  oldAmount: number;
}


export function Dashboard() {
  const [data, setData] = useState<PokemonData[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationData>();
  const [getAmount, setGetAmount] = useState<GetAmountData>({
    amount: 20,
    oldAmount: 1
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data: PaginationData = await api.get('/pokemon/')
        .then(data => data.data)

      setPaginationData({
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: data.results
      });

      return data;
    }

    fetchData()

    async function fetchPokeDetails() {
      let data: PokemonData[] = [];
      for (let i = getAmount.oldAmount; i <= getAmount.amount; i++) {
        data.push(await api.get(`/pokemon/${i}`)
          .then(data => {
            return {
              isLoading: false,
              data: data.data
            }
          }))
      }

      setIsLoading(data[0].isLoading);
      setData(data);
      return data;
    }

    fetchPokeDetails();
  }, [getAmount]);

  function changePage(direction: string) {
    if (direction === 'next') {
      setIsLoading(true);
      setGetAmount({
        amount: getAmount.amount + 20,
        oldAmount: getAmount.oldAmount + 20
      });
    } else if (direction === 'prev' && getAmount.amount >= 40) {
      setIsLoading(true);
      setGetAmount({
        amount: getAmount.amount - 20,
        oldAmount: getAmount.oldAmount - 20
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
      <button onClick={() => changePage('prev')}>previous</button>
      <button onClick={() => changePage('next')}>next</button>
    </Container>
  )
}