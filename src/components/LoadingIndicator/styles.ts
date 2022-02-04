import styled from 'styled-components';

export const Container = styled.div`
  display:flex;
  width:100%;
  justify-content:center;
  align-items:center;
  grid-column-start: 2;

  img {
    opacity: 0.15;
    animation: rotation 20s infinite linear;  
  }

  @keyframes rotation {
    0%{
      transform: rotate(0deg);

    }
    100%{
      transform: rotate(360deg);
    }

  }
`