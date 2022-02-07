import { useEffect, useState } from "react";
import { usePokedex } from "../../hooks/usePokedex";
import { Container, PageButton } from "./styles"

type GetAmountData = {
  amount: number;
  limit: number;
}

interface PaginationNumbersProps {
  changePageFunction: (direction: string) => void;
  count: number;
  amount: {
    getAmount: GetAmountData;
    setGetAmount: (amount: GetAmountData) => void;
    cardAmount: number;
  }
}


export function PaginationNumbers({ changePageFunction, count, amount }: PaginationNumbersProps) {
  const [pageArray, setPageArray] = useState<number[]>([]);
  const { setIsLoading, pageNumbers, setPageNumbers } = usePokedex();

  useEffect(() => {
    function generatePageNumbers() {
      let array: number[] = [];

      if (pageNumbers.last === null) {
        // code to resolve go to last bug
      }
      
      for (let i = pageNumbers.first; i <= pageNumbers.last; i++) {
        array.push(i);
      }

      console.log(pageNumbers.first);
      setPageArray(array);
    }

    generatePageNumbers();
  }, [pageNumbers]);

  function updateSearch(pageNumber: number) {
    setIsLoading(true);
    const newAmount = {
      amount: (pageNumber - 1) * amount.cardAmount,
      limit: amount.cardAmount,
    }

    const newPageNumbers = {
      first: pageNumber,
      last: pageNumber + 4
    }

    amount.setGetAmount(newAmount);
    setPageNumbers(newPageNumbers);
  }

  return (
    <Container>
      <div>
      <button onClick={() => changePageFunction('first')}>First</button>
      <button onClick={() => changePageFunction('prev')}>{`<<`}</button>
      {pageArray.map(page => {
        return (
          <PageButton key={page} className={page.toString() + '-select'} onClick={() => updateSearch(page)}>{page}</PageButton>
        )
      })}
      <button onClick={() => changePageFunction('next')}>{`>>`}</button>
      <button onClick={() => changePageFunction('last')}>Last</button>
      </div>
    </Container>
  )
}