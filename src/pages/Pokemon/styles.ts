import styled from 'styled-components';

export const Container = styled.div`
  h1 {
    -webkit-text-shadow: 0px 5px 12px rgba(186,186,186, 1); 
    text-shadow: 0px 5px 12px rgba(186,186,186, 1);

    &.pokemon-name {
      text-transform: capitalize;

      &.japanese {
        font-family: 'Noto Sans JP', sans-serif;
      }
    }
  }
`