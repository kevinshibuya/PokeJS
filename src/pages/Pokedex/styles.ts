import styled from 'styled-components';

export const Container = styled.div`
  div.search-bar {
    margin-bottom: 4rem;

    input {
      width: 100%;
      border: none;
      padding: 2rem;
      border-radius: 1.8rem;
      font-size: 1rem;
      -webkit-box-shadow: 0px 5px 12px 6px rgba(186,186,186,0.30); 
      box-shadow: 0px 5px 12px 6px rgba(186,186,186,0.30);

      &:focus {
        outline: none;
      }

      &::placeholder {
        font-size: 1rem;
        color: #8c8c8c;
      }
    }
  }

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
`