import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { usePokedex } from "../../hooks/usePokedex";

import pokeball from '../../assets/pokeball.svg';
import about from '../../assets/about.svg';
import pikachu from '../../assets/pikachu.svg';
import { Container } from "./styles";

export function Header() {
  const { pokemonDetails } = usePokedex();

  return (
    <Container>
      <nav>
        <NavLink className={({ isActive }) => isActive ? "active" : "not-active"} to="/">
          <img src={pokeball} alt="pokedex" />
          <p>Pokedex</p>
        </NavLink>
        { Object.keys(pokemonDetails).length === 0 
            ? '' 
            : <NavLink className={({ isActive }) => isActive ? "active" : "not-active"} to="/pokemon">
                <img className="pokemon" src={pikachu} alt="pokedex" />
                <p>Pokemon</p>
              </NavLink>
        }
        <NavLink className={({ isActive }) => isActive ? "active" : "not-active"} to="/about">
          <img className="about" src={about} alt="pokedex" />
          <p>About</p>
        </NavLink>
      </nav>
      <Outlet />
    </Container>
  )
}