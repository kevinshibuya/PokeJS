import { Container } from './styles';

import pokeball from '../../assets/pokeball.svg';

export function LoadingIndicator() {

  return (
    <Container>
      <img src={pokeball} alt="pokeballa" />
    </Container>
  )
}