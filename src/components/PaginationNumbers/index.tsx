import { useEffect, useState } from "react";
import { usePokedex } from "../../hooks/usePokedex";
import { Container, PageButton } from "./styles"

interface PaginationNumbersProps {
  pageAmount: number;
  search: string;
}


export function PaginationNumbers({ pageAmount, search }: PaginationNumbersProps) {
  const [pageArray, setPageArray] = useState<number[]>([]);
  const { setIsLoading, pageNumbers, setPageNumbers } = usePokedex();

  useEffect(() => {
    function generatePageNumbers() {
      if (!search) return;
      
      let array: number[] = [];

      const lastNumber = pageAmount >= 5 ? 5 : pageAmount;

      for (let i = 0; i < lastNumber; i++) {
        array.push(i);
      }

      setPageArray(array);
      setPageNumbers({
        first: 1,
        last: lastNumber
      })
    }

    generatePageNumbers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pageAmount]);

  useEffect(() => {
    let array: number[] = [];

    for (let i = pageNumbers.first; i <= pageNumbers.last; i++) {
      array.push(i);
    }

    setPageArray(array);
  }, [pageNumbers]);

  function changePage(direction: string) {
    if (direction === 'next') {
      if (pageArray.length === 1) return;
      setIsLoading(true);
      setPageNumbers({
        first: pageNumbers.first + 1 > pageAmount ? pageAmount : pageNumbers.first + 1,
        last: pageNumbers.last + 1 > pageAmount ? pageAmount + 1 : pageNumbers.last + 1
      });
    } else if (direction === 'prev') {
      if (pageNumbers.first === 1) return;
      setIsLoading(true);
      setPageNumbers({
        first: pageNumbers.first - 1 > pageAmount ? pageAmount : pageNumbers.first - 1,
        last: pageArray.length === 5 ? pageNumbers.last - 1 : pageNumbers.last
      });
    } else if (direction === 'first') {
      if (pageNumbers.first === 1) return;
      setIsLoading(true);
      setPageNumbers({
        first: 1,
        last: pageAmount >= 5 ? 5 : pageAmount
      });
    } else if (direction === 'last') {
      if (pageNumbers.first === pageAmount) return;
      setIsLoading(true);
      setPageNumbers({
        first: pageAmount,
        last: pageAmount
      });
    }
  }

  function goToPageNumber(pageNumber: number) {
    if (pageNumbers.first === pageNumber) return;
    setIsLoading(true);
    setPageNumbers({
      first: pageNumber,
      last: pageNumber + 5 > pageAmount ? pageAmount : pageNumber + 4
    });
  }

  return (
    <Container>
      <div>
        <button className="hide-button" onClick={() => changePage('first')}>First</button>
        <button className="previous-button" onClick={() => changePage('prev')}>{`<<`}</button>
        {pageArray.map(page => {
          return (
            <PageButton key={page} onClick={() => goToPageNumber(page)}>{page}</PageButton>
          )
        })}
        <button className="next-button" onClick={() => changePage('next')}>{`>>`}</button>
        <button className="hide-button" onClick={() => changePage('last')}>Last</button>
      </div>
    </Container>
  )
}