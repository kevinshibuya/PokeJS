import { useEffect, useMemo, useState } from "react"
import debounce from 'lodash.debounce';

import { Cards } from "../../components/Cards";
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { PaginationNumbers } from '../../components/PaginationNumbers';
import { usePokedex } from "../../hooks/usePokedex";
import { api } from "../../services/api";
import { PokemonData } from "../../types/global";

import { Container } from "./styles"
import desc from '../../assets/descending.png';
import asc from '../../assets/ascending.png';
import dft from '../../assets/default.png';

interface PaginationData {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string; }[];
}

export function Pokedex() {
  const [pageAmount, setPageAmount] = useState(0);

  const { isLoading, setIsLoading, data, setData, cardAmount, search, setSearch, pageNumbers, orderByValue, setOrderByValue, paginationData, setPaginationData } = usePokedex();

  useEffect(() => {
    async function fetchData() {
      if (Object.keys(paginationData).length !== 0) return;
      console.log("Fetching data...");
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setPageAmount(1);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, paginationData, cardAmount, pageNumbers]);

  function changeSearch(event: any) {
    setIsLoading(true);
    setSearch(event.target.value);

    return search;
  }

  const debounceChangeSearch = useMemo(() => {
    return debounce(changeSearch, 300);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = [
    {
      name: 'Default',
      value: 'dft'
    },
    {
      name: 'Ascending',
      value: 'asc'
    },
    {
      name: 'Descending',
      value: 'desc'
    },
  ];

  useEffect(() => {
    async function handleOrderChange() {
      setIsLoading(true);
      const newPaginationData = { ...paginationData };

      let newData;

      switch (orderByValue) {
        case 'asc':
          newData = newPaginationData.results.sort((a: any, b: any) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          break;
        case 'desc':
          newData = newPaginationData.results.sort((a: any, b: any) => {
            if (a.name < b.name) { return 1; }
            if (a.name > b.name) { return -1; }
            return 0;
          });
          break;
        default:
          newData = newPaginationData.results.sort((a: any, b: any) => {
            const stringA = parseInt(a.url.substr(34).replace('/', ''));
            const stringB = parseInt(b.url.substr(34).replace('/', ''));
            if (stringA < stringB) { return -1; }
            if (stringA > stringB) { return 1; }
            return 0;
          });
          break;
      }

      setPaginationData({
        count: newPaginationData.count,
        next: newPaginationData.next,
        previous: newPaginationData.previous,
        results: newData
      });
    }

    handleOrderChange()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderByValue]);

  function handleOrderBy(filter: string) {
    let nextOrderValue = '';
    switch (filter) {
      case 'dft':
        nextOrderValue = 'asc';
        break;
      case 'asc':
        nextOrderValue = 'desc';
        break;
      default:
        nextOrderValue = 'dft';
        break;
    }
    setOrderByValue(nextOrderValue);
  }

  return (
    <Container>
      <div className="search-bar">
        <input
          type="text"
          placeholder={search ? search : "Search your Pokemon!"}
          onChange={debounceChangeSearch}
        />
        <button className="order-by" onClick={() => handleOrderBy(orderByValue)}>
          {options[options.findIndex((option) => { return option.value === orderByValue; })].name}
          {options.map(option => {
            if (option.value === orderByValue && option.value === 'asc') {
              return <img key={option.name} src={asc} alt="Ascending" />
            } else if (option.value === orderByValue && option.value === 'desc') {
              return <img key={option.name} src={desc} alt="Descending" />
            }else if (option.value === orderByValue && option.value === 'dft') {
              return <img key={option.name} src={dft} alt="Default" />
            }
            return undefined;
          })}
        </button>
      </div>
      {isLoading ? <LoadingIndicator /> : undefined}
      <div className="cards">
        {isLoading ? undefined : data.map(data => {
          return (
            <Cards key={data.data.id} pokemonData={data.data}></Cards>
          )
        })}
      </div>
      {data.length === [].length && !isLoading
        ? <div className="no-pokemon">
          No pokemon found
        </div>
        : undefined
      }
      <PaginationNumbers pageAmount={pageAmount} search={search} />
    </Container>
  )
}