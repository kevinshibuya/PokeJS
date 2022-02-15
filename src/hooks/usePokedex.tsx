import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { PokemonData } from "../types/global";

interface PokedexProviderProps {
  children: ReactNode;
}

interface PokedexContextData {
  pageNumbers: PageNumbers;
  setPageNumbers: (value: PageNumbers) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  data: PokemonData[];
  setData: (data: PokemonData[]) => void;
  cardAmount: number;
  search: string;
  setSearch: (value: string) => void;
  orderByValue: string;
  setOrderByValue: (value: string) => void;
  paginationData: PaginationData;
  setPaginationData: (data: PaginationData) => void;
  pokemonDetails: PokemonData;
  setPokemonDetails: (data: PokemonData) => void;
  favoritePokemondData: PokemonData[];
  togglePokemonFavorite: (data: PokemonData) => void;
}

interface PaginationData {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string; }[];
}

type PageNumbers = {
  first: number;
  last: number;
}

const PokedexContext = createContext<PokedexContextData>({} as PokedexContextData);

export function PokedexProvider({ children }: PokedexProviderProps) {
  const [pageNumbers, setPageNumbers] = useState<PageNumbers>({
    first: 1,
    last: 5,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<PokemonData[]>([]);
  const [favoritePokemondData, setFavoritePokemondData] = useState<PokemonData[]>(() => {
    const storagedFavoritePokemons = localStorage.getItem('@PokeJS:favorites');

    if (storagedFavoritePokemons) {
      return JSON.parse(storagedFavoritePokemons);
    }

    return [];
  });
  const [cardAmount, setCardAmount] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [search, setSearch] = useState('');
  const [paginationData, setPaginationData] = useState<PaginationData>({} as PaginationData);
  const [orderByValue, setOrderByValue] = useState('dft');
  const [pokemonDetails, setPokemonDetails] = useState({} as PokemonData);

  function handleWindowSizeChange() {
    setScreenWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [screenWidth]);

  const isSmallScreen = screenWidth <= 1008;
  const isMobile = screenWidth <= 674;

  useEffect(() => {
    if (isMobile) {
      setCardAmount(5);
    } else if (isSmallScreen) {
      setCardAmount(10);
    } else {
      setCardAmount(15);
    }
  }, [isMobile, isSmallScreen]);

  function togglePokemonFavorite(data: PokemonData) {
    const newPokemon = {...data};
    let newFavoriteData = [...favoritePokemondData];

    newPokemon.isFavorite = !(newPokemon.isFavorite);

    if (newPokemon.isFavorite) {
      newFavoriteData.push(newPokemon);
    } else {
      newFavoriteData.splice(newFavoriteData.findIndex(pokemon => pokemon.data.name === newPokemon.data.name), 1);
    }

    newFavoriteData = newFavoriteData.sort((a: PokemonData, b: PokemonData) => {
      if (a.data.id < b.data.id) { return -1; }
      if (a.data.id> b.data.id) { return 1; }
      return 0;
    });

    setPokemonDetails(newPokemon);
    setFavoritePokemondData(newFavoriteData);
    localStorage.setItem('@PokeJS:favorites', JSON.stringify(newFavoriteData));
  }

 return (
   <PokedexContext.Provider value={{ pageNumbers, setPageNumbers, isLoading, setIsLoading, data, setData, cardAmount, search, setSearch, orderByValue, setOrderByValue, paginationData, setPaginationData, pokemonDetails, setPokemonDetails, togglePokemonFavorite, favoritePokemondData }}>
     {children}
   </PokedexContext.Provider>
 )
}

export function usePokedex() {
  const context = useContext(PokedexContext);

  return context;
}