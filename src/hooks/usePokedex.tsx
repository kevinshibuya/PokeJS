import { createContext, ReactNode, useContext, useState } from "react";
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
  const [getAmount, setGetAmount] = useState<GetAmountData>({
    amount: 0,
    limit: 21
  });

  // function updateSearch(pageNumber: number) {
  //   {oldAmount, amount} * pageNumber
  //   return {oldAmount, amount}
  //   setado em setGetAmount()
  // }

 return (
   <PokedexContext.Provider value={{ pageNumbers, setPageNumbers, isLoading, setIsLoading, data, setData, getAmount, setGetAmount }}>
     {children}
   </PokedexContext.Provider>
 )
}

export function usePokedex() {
  const context = useContext(PokedexContext);

  return context;
}