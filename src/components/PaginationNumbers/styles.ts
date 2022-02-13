import styled from 'styled-components';

interface PageButtonProps {
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;

  div {
    -webkit-box-shadow: 0 1px 15px rgb(0 0 0 / 20%); 
    box-shadow: 0 1px 15px rgb(0 0 0 / 20%);
    border-radius: 0.5rem;
  }

  button {
    position: relative;
    background: #fff;
    color: #011030;
    font-size: 1rem;
    padding: 1rem;
    font-weight: 700;
    z-index: 1;
    border: 0rem;
    transition: background 0.2s ease-in;

    &:hover {
      background: #f2f2f2;
    }

    &:before {
      content : "";
      position: absolute;
      right: 0;
      top: 20%;
      height: 60%;
      border-right: 0.1rem solid #011030;
    }

    &:first-child {
      border-radius: 0.5rem 0rem 0rem 0.5rem;
    }

    &:last-child {
      border-right: 0rem;
      border-radius: 0rem 0.5rem 0.5rem 0rem;

      &:before {
        border: 0rem;
      }
    }
    
    &:nth-child(3) {
      background: #f2f2f2!important;
    }
  }

  @media (max-width: 440px) {
    .next-button {
      border-right: 0rem;
      border-radius: 0rem 0.5rem 0.5rem 0rem;

      &:before {
        border: 0rem;
      }
    }
    .hide-button {
      display: none;
    }
  }
`

export const PageButton = styled.button<PageButtonProps>`
  &:first-child {
    background: #f2f2f2!important;
  }
`