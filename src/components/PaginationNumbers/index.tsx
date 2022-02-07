import { useEffect, useState } from "react";
import { usePokedex } from "../../hooks/usePokedex";
import { Container, PageButton } from "./styles"

interface PaginationNumbersProps {
  count: number;
}


export function PaginationNumbers({ count }: PaginationNumbersProps) {
  const [pageArray, setPageArray] = useState<number[]>([]);
  const { setIsLoading, pageNumbers, setPageNumbers, dataAmount, setDataAmount, cardAmount } = usePokedex();

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
      start: (pageNumber - 1) * cardAmount,
      dataLimit: cardAmount,
    }

    const newPageNumbers = {
      first: pageNumber,
      last: pageNumber + 4
    }

    setDataAmount(newAmount);
    setPageNumbers(newPageNumbers);
  }

  function changePage(direction: string) {
    if (direction === 'next') {
      setIsLoading(true);
      setDataAmount({
        start: dataAmount.start + cardAmount,
        dataLimit: cardAmount
      });
      setPageNumbers({
        first: pageNumbers.first + 1,
        last: pageNumbers.last + 1
      });
    } else if (direction === 'prev' && dataAmount.start >= cardAmount) {
      setIsLoading(true);
      setDataAmount({
        start: dataAmount.start - cardAmount,
        dataLimit: cardAmount
      });
      setPageNumbers({
        first: pageNumbers.first + -1,
        last: pageNumbers.last + -1
      });
    } else if (direction === 'last') {
      setIsLoading(true);
      setDataAmount({
        start: (Math.floor(count / cardAmount)) * cardAmount,
        dataLimit: count - (Math.floor(count / cardAmount)) * cardAmount
      });
      setPageNumbers({
        first: Math.floor(count / cardAmount),
        last: 5
      });
    } else if (direction === 'first') {
      setIsLoading(true);
      setDataAmount({
        start: 0,
        dataLimit: cardAmount
      });
      setPageNumbers({
        first: 1,
        last: 5
      });
    }
  }

  return (
    <Container>
      <div>
      <button onClick={() => changePage('first')}>First</button>
      <button onClick={() => changePage('prev')}>{`<<`}</button>
      {pageArray.map(page => {
        return (
          <PageButton key={page} className={page.toString() + '-select'} onClick={() => updateSearch(page)}>{page}</PageButton>
        )
      })}
      <button onClick={() => changePage('next')}>{`>>`}</button>
      <button onClick={() => changePage('last')}>Last</button>
      </div>
    </Container>
  )
}