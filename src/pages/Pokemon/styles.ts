import styled from 'styled-components';

import hidden from '../../assets/hidden.svg';

type ContainerProps = {
  screenScrollHeight: number;
}

export const Container = styled.div<ContainerProps>`
  /* position: relative; */

  div.background-wrapper {
    position: absolute;
    width: 100%;
    height: ${(props) => props.screenScrollHeight ? props.screenScrollHeight : document.body.scrollHeight}px;
    z-index: -1;
    top: 0;
    left: 0;
  }

  div.title-wrapper {
    position: relative;
  }

  .pokemon-id {
    font-size: 1.5rem;
  }

  .pokemon-name {
    font-size: 2.5rem;
  }

  .pokemon-name, .pokemon-id {
    color: #FFF;
    text-transform: capitalize;
    -webkit-text-shadow: 0 1px 15px rgb(0 0 0 / 20%); 
    text-shadow: 0 1px 15px rgb(0 0 0 / 20%);
  }

  div.wrapper {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;

  }
  
  a {
    position: absolute;
    top: -30px;
  }

  h1.title {
    text-transform: uppercase;
    text-align: center;
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 1px;
    margin-bottom: 0.4rem;
  }


  div.pokemon-landing {
    display: flex;
    flex-direction: column;
    margin-right: 2rem;
    width: 100%;

    .img {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 100%;

      img {
        width: 90%;
        margin: auto;
        min-width: 400px
      }
    }
    .pokemon-name {
      &.japanese {
        color: #000;
        font-family: 'Noto Sans JP', sans-serif;
        font-size: 5rem;
        opacity: 0.3;
        position: absolute;
        text-shadow: none;
        z-index: 10;
        top: -5%;
        left: -5%;
      }
    }
  }

  div.pokemon-wrapper {
    background: #fff;
    border-radius: 1.8rem;
    padding: 1.4rem;
    width: 100%;
    max-width: 370px;
    min-width: 360px;
    -webkit-box-shadow: 0 1px 15px rgb(0 0 0 / 20%); 
    box-shadow: 0 1px 15px rgb(0 0 0 / 20%);
    margin-bottom: 1.2rem;
  }

  div.pokemon-details {
    div.pokemon-genus {
      div.types {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    div.pokemon-entry {
      h1.content {
        font-size: 1rem;
        font-weight: 400;
        text-align: center;
      }
    }

    div.abilities {
      div.content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;
      }
    }

    div.data {
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
    }

    div.pokemon-stats {
      div.content {
        display: flex;
        justify-content: space-around;

        .stat {
          background: #F6F8FC;
          padding: 0.3rem 0.3rem 0.8rem;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 800;
          text-align: center;

          &.total {
            background: #8FB4FF;
          }

          .stat-title {
            width: 30px;
            height: 30px;
            margin-bottom: 0.4rem;
            text-align: center;
            color: #fff;
            line-height: 24px;
            font-size: 0.7rem;
            border-radius: 100%;
            padding: 0.2rem;

            &.total {
              background: #7595DB;
            }
          }
        } 
      }
    }
  }

  
  @media(max-width: 674px) {
  }
`

interface TypesProps {
  type: string;
}

export const Types = styled.div<TypesProps>`
  padding: 0.5rem;
  margin: 0rem 0.4rem;
  background: ${(props) => `var(--${props.type})`};
  color: ${(props) => `var(--${props.type}-text)`};
  font-weight: 800;
  border-radius: 0.5rem;
`

type PokemonAbilityTypeProps = {
  isHidden: boolean;
  isVisible: boolean;
}

export const PokemonAbility = styled.div<PokemonAbilityTypeProps>`
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
    border-radius: 1.8rem;
    width: 200px;
    
    position: absolute;
    bottom: 120%;
    left: 50%;
    margin-left: -100px;
    padding: 1rem;

    cursor: default;
    -webkit-box-shadow: 0 1px 15px rgb(0 0 0 / 20%); 
    box-shadow: 0 1px 15px rgb(0 0 0 / 20%);
  }
`

type PokemonStatsProps = {
  statName: {
    name: string;
    color: string;
  };
}

export const PokemonStats = styled.div<PokemonStatsProps>`
  div.stat-title {
    background: ${(props) => props.statName.color};
  }
`