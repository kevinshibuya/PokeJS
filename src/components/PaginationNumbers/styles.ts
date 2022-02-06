import styled from 'styled-components';

interface PageButtonProps {
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;

  div {
    -webkit-box-shadow: 0px 5px 12px 6px rgba(186,186,186,0.30); 
    box-shadow: 0px 5px 12px 6px rgba(186,186,186,0.30);
    border-radius: 8px;
  }

  button {
    position: relative;
    background: #fff;
    color: #011030;
    font-size: 1rem;
    padding: 1rem;
    font-weight: 700;
    border: 0px;
    z-index: 1;
    border: 0px;
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
      border-right: 1px solid #011030;
    }

    &:first-child {
      border-radius: 8px 0px 0px 8px;
    }

    &:last-child {
      border-right: 0px;
      border-radius: 0px 8px 8px 0px;

      &:before {
        border: 0px;
      }
    }
    
    &:nth-child(3) {
      background: #f2f2f2!important;
    }
  }
`

export const PageButton = styled.button<PageButtonProps>`
  &:first-child {
    background: #f2f2f2!important;
  }
`