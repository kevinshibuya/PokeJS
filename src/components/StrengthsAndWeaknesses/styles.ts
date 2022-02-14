import styled from 'styled-components';

import bug from '../../assets/bug.svg';
import dark from '../../assets/dark.svg';
import dragon from '../../assets/dragon.svg';
import electric from '../../assets/electric.svg';
import fairy from '../../assets/fairy.svg';
import fighting from '../../assets/fighting.svg';
import fire from '../../assets/fire.svg';
import flying from '../../assets/flying.svg';
import ghost from '../../assets/ghost.svg';
import grass from '../../assets/grass.svg';
import ground from '../../assets/ground.svg';
import ice from '../../assets/ice.svg';
import normal from '../../assets/normal.svg';
import poison from '../../assets/poison.svg';
import psychic from '../../assets/psychic.svg';
import rock from '../../assets/rock.svg';
import steel from '../../assets/steel.svg';
import water from '../../assets/water.svg';

const backgroundImages = [
  {
    name: 'bug',
    url: bug
  }, 
  {
    name: 'dark',
    url: dark
  }, 
  {
    name: 'dragon',
    url: dragon
  }, 
  {
    name: 'electric',
    url: electric
  }, 
  {
    name: 'fairy',
    url: fairy
  }, 
  {
    name: 'fighting',
    url: fighting
  }, 
  {
    name: 'fire',
    url: fire
  }, 
  {
    name: 'flying',
    url: flying
  }, 
  {
    name: 'ghost',
    url: ghost
  }, 
  {
    name: 'grass',
    url: grass
  }, 
  {
    name: 'ground',
    url: ground
  }, 
  {
    name: 'ice',
    url: ice
  }, 
  {
    name: 'normal',
    url: normal
  }, 
  {
    name: 'poison',
    url: poison
  }, 
  {
    name: 'psychic',
    url: psychic
  }, 
  {
    name: 'rock',
    url: rock
  }, 
  {
    name: 'steel',
    url: steel
  }, 
  {
    name: 'water',
    url: water
  }];

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

  h1.title {
  }

  div.content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 0.4rem;
    background: #F6F8FC;
    padding: 0.5rem;
    border-radius: 30px;

    font-weight: 600;
    text-align: center;

    &.first {
      margin-bottom: 1rem;
    }

    .type-icon {
      width: 30px;
      height: 30px;
      border-radius: 100%;

      &.title {
        background: #8F9396;
        text-align: center;
        color: #fff;
        line-height: 22px;
        font-size: 0.7rem;
        font-weight: 800;
        border-radius: 100%;
        padding: 0.2rem 0rem;
      }
    }
  }
`

interface TypeIconProps {
  typeName: string;
}

export const TypeIcon = styled.div<TypeIconProps>`
  background: url(${(props) => backgroundImages[backgroundImages.findIndex(image => image.name === props.typeName)].url}) no-repeat center 100%;
`