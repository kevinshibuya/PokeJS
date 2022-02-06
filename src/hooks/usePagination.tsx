import { createContext, ReactNode, useContext, useState } from "react";

interface PaginationProviderProps {
  children: ReactNode;
}

interface PaginationContextData {
  pageNumbers: PageNumbers;
  setPageNumbers: (value: PageNumbers) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

type PageNumbers = {
  first: number;
  last: number;
}

const PaginationContext = createContext<PaginationContextData>({} as PaginationContextData);

export function PaginationProvider({ children }: PaginationProviderProps) {
  const [pageNumbers, setPageNumbers] = useState<PageNumbers>({
    first: 1,
    last: 5,
  });
  const [isLoading, setIsLoading] = useState(true);

  // function updateSearch(pageNumber: number) {
  //   {oldAmount, amount} * pageNumber
  //   return {oldAmount, amount}
  //   setado em setGetAmount()
  // }

 return (
   <PaginationContext.Provider value={{ pageNumbers, setPageNumbers, isLoading, setIsLoading }}>
     {children}
   </PaginationContext.Provider>
 )
}

export function usePagination() {
  const context = useContext(PaginationContext);

  return context;
}