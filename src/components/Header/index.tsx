import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Container } from "./styles";

import pokeball from '../../assets/pokeball.svg';
import about from '../../assets/about.svg';

export function Header() {
  return (
    <Container>
      <nav>
        <NavLink className={({ isActive }) => isActive ? "active" : "not-active"} to="/">
          <img src={pokeball} alt="pokedex" />
          <p>Pokedex</p>
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? "active" : "not-active"} to="/about">
          <img className="about" src={about} alt="pokedex" />
          <p>About</p>
        </NavLink>
      </nav>
      <Outlet />
    </Container>
  )
}