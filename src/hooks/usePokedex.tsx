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
  getAmount: GetAmountData;
  setGetAmount: (getAmount: GetAmountData) => void;
  cardAmount: number;
}

interface GetAmountData {
  amount: number;
  limit: number;
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
  const [cardAmount, setCardAmount] = useState(15);
  const [getAmount, setGetAmount] = useState<GetAmountData>({
    amount: 0,
    limit: cardAmount
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
      setGetAmount({
        amount: 0,
        limit: 5
      });
    } else if (isSmallScreen) {
      setCardAmount(10);
      setGetAmount({
        amount: 0,
        limit: 10
      });
    } else {
      setCardAmount(15);
      setGetAmount({
        amount: 0,
        limit: 15
      });
    }
  }, [isMobile, isSmallScreen]);

  // function updateSearch(pageNumber: number) {
  //   {oldAmount, amount} * pageNumber
  //   return {oldAmount, amount}
  //   setado em setGetAmount()
  // }

 return (
   <PokedexContext.Provider value={{ pageNumbers, setPageNumbers, isLoading, setIsLoading, data, setData, getAmount, setGetAmount, cardAmount }}>
     {children}
   </PokedexContext.Provider>
 )
}

export function usePokedex() {
  const context = useContext(PokedexContext);

  return context;
}