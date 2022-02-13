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
  pokemonDetails: PokemonData["data"];
  setPokemonDetails: (data: PokemonData["data"]) => void;
  backgroundColor: string;
  setBackgroundColor: (value: string) => void;
  outerScreenSize: OuterScreenSize;
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

type OuterScreenSize = {
  height: number;
  width: number;
}

const PokedexContext = createContext<PokedexContextData>({} as PokedexContextData);

export function PokedexProvider({ children }: PokedexProviderProps) {
  const [pageNumbers, setPageNumbers] = useState<PageNumbers>({
    first: 1,
    last: 5,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<PokemonData[]>([]);
  const [cardAmount, setCardAmount] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [outerScreenSize, setOuterScreenSize] = useState<OuterScreenSize>({} as OuterScreenSize);
  const [search, setSearch] = useState('');
  const [paginationData, setPaginationData] = useState<PaginationData>({} as PaginationData);
  const [orderByValue, setOrderByValue] = useState('dft');
  const [pokemonDetails, setPokemonDetails] = useState({} as PokemonData["data"]);
  const [backgroundColor, setBackgroundColor] = useState('#F6F8FC')

  function handleWindowSizeChange() {
    setScreenWidth(window.innerWidth);
    setOuterScreenSize({
      height: document.body.scrollHeight,
      width: window.outerWidth
    });
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

 return (
   <PokedexContext.Provider value={{ pageNumbers, setPageNumbers, isLoading, setIsLoading, data, setData, cardAmount, search, setSearch, orderByValue, setOrderByValue, paginationData, setPaginationData, pokemonDetails, setPokemonDetails, backgroundColor, setBackgroundColor, outerScreenSize }}>
     {children}
   </PokedexContext.Provider>
 )
}

export function usePokedex() {
  const context = useContext(PokedexContext);

  return context;
}