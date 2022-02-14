import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

  h1.title {
  }

  div.content {
    background: #F6F8FC;
    padding: 0.5rem;
    border-radius: 30px;

    font-weight: 600;
    text-align: center;
  }
`