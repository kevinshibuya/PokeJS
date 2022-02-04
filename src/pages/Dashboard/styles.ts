import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 4rem 2rem;

  div.cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 4rem;
  }
`