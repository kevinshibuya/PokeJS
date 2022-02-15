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
      -webkit-box-shadow: 0 1px 15px rgb(0 0 0 / 20%); 
      box-shadow: 0 1px 15px rgb(0 0 0 / 20%);

      &:focus {
        outline: none;
      }

      &::placeholder {
        font-size: 1rem;
        color: #8c8c8c;
      }
    }
  }

  button.order-by {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1rem;
    background: none;
    border: none;
    margin-top: 2rem;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    img {
      margin: auto;
      margin-left: 0.3rem;
      height: 1rem;
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

  .no-pokemon {
    font-size: 1.4rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`