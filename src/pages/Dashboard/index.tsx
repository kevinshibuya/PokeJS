import axios from "axios";
import { useEffect, useState } from "react"
import { Cards } from "../../components/Cards";
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
  // pagination {next, previous}
  const [paginationData, setPaginationData] = useState<PaginationData>();
  const [getAmount, setGetAmount] = useState<GetAmountData>({
    amount: 20,
    oldAmount: 1
  });

  useEffect(() => {
    async function getData() {
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

    getData()

    async function getPokeDetails() {
      let data: PokemonData[] = [];
      for (let i = getAmount.oldAmount; i <= getAmount.amount; i++) {
        data.push(await api.get(`/pokemon/${i}`)
          .then(data => data.data))

      }

      setData(data);
      return data;
    }

    getPokeDetails();
  }, [getAmount]);

  function changePage(direction: string) {
    if (direction === 'next') {
      setGetAmount({
        amount: getAmount.amount + 20,
        oldAmount: getAmount.oldAmount + 20
      });
      console.log('next');
    } else if (direction === 'prev' && getAmount.amount >= 40) {
      setGetAmount({
        amount: getAmount.amount - 20,
        oldAmount: getAmount.oldAmount - 20
      });
      console.log('prev');
    }
  }

  console.log(data);

  return (
    <Container>
      <div className="cards">
        {data.map(data => {
          return (
            <Cards key={data.id} pokemonData={data}></Cards>
          )
        })}
      </div>
      <button onClick={() => changePage('prev')}>previous</button>
      <button onClick={() => changePage('next')}>next</button>
    </Container>
  )
}