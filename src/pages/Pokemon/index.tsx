import { NavLink } from "react-router-dom";

import { Container } from "./styles";

export function Pokemon() {
  return (
    <Container>
      <NavLink to="/">return</NavLink>
      <h1>Pokemon</h1>
    </Container>
  )
}