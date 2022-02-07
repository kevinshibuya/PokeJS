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
  dataAmount: DataAmount;
  setDataAmount: (getAmount: DataAmount) => void;
  cardAmount: number;
}

interface DataAmount {
  start: number;
  dataLimit: number;
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
  const [cardAmount, setCardAmount] = useState(0);
  const [dataAmount, setDataAmount] = useState<DataAmount>({
    start: 0,
    dataLimit: cardAmount,
  });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setScreenWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    console.log(window.innerWidth)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [screenWidth]);

  const isSmallScreen = screenWidth <= 1008;
  const isMobile = screenWidth <= 674;

  useEffect(() => {
    if (isMobile) {
      setCardAmount(5);
      setDataAmount({
        start: 0,
        dataLimit: 5,
      });
    } else if (isSmallScreen) {
      setCardAmount(10);
      setDataAmount({
        start: 0,
        dataLimit: 10,
      });
    } else {
      setCardAmount(15);
      setDataAmount({
        start: 0,
        dataLimit: 15,
      });
    }
  }, [isMobile, isSmallScreen]);

  // function updateSearch(pageNumber: number) {
  //   {oldAmount, amount} * pageNumber
  //   return {oldAmount, amount}
  //   setado em setDataAmount()
  // }

 return (
   <PokedexContext.Provider value={{ pageNumbers, setPageNumbers, isLoading, setIsLoading, data, setData, dataAmount, setDataAmount, cardAmount }}>
     {children}
   </PokedexContext.Provider>
 )
}

export function usePokedex() {
  const context = useContext(PokedexContext);

  return context;
}