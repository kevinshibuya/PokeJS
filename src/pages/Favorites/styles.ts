import styled from 'styled-components';

export const Container = styled.div`
  div.cards {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 4rem 2rem;

    @media(max-width: 1008px) {
      grid-template-columns: 1fr 1fr;
    }

    @media(max-width: 674px) {
      grid-template-columns: 1fr;
    }
  }

  .no-pokemon {
    font-size: 1.4rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`