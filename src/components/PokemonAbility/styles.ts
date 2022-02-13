import styled from 'styled-components';

import hidden from '../../assets/hidden.svg';

type ContainerProps = {
  isHidden: boolean;
  isVisible: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #F6F8FC ${(props) => props.isHidden ? `url(${hidden})` : undefined} no-repeat 90% center;
  background-size: 1.5rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 30px;
  cursor: pointer;

  position: relative;
  font-weight: 600;
  text-align: left;
  text-transform: capitalize;
  border: 2px solid ${(props) => props.isHidden ? '#C48385' : '#C2CDEB'};

  div.tooltip {
    opacity: ${(props) => props.isVisible ? 1 : 0};
    background: #fff;
    font-size: 1rem;
    font-weight: 400;
    text-transform: none;
    border-radius: 1rem;
    width: 200px;
    max-height: 300px;
    overflow-y: scroll;
    
    position: absolute;
    bottom: 120%;
    left: 50%;
    margin-left: -100px;
    padding: 1rem;

    cursor: default;
    -webkit-box-shadow: 0 1px 15px rgb(0 0 0 / 20%); 
    box-shadow: 0 1px 15px rgb(0 0 0 / 20%);
    transition: opacity 0.1s linear;

    /* Firefox */
    scrollbar-width: auto;
    scrollbar-color: #a8a8a8 #ffffff;

    /* Chrome, Edge, and Safari */
    ::-webkit-scrollbar {
      width: 16px;
    }

    ::-webkit-scrollbar-track {
      background: none;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #a8a8a8;
      border-radius: 10px;
      border: 3px solid #ffffff;
    }
  }
`