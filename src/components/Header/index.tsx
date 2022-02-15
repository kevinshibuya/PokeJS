import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { usePokedex } from "../../hooks/usePokedex";

import pokeball from '../../assets/pokeball.svg';
import about from '../../assets/about.svg';
import pikachu from '../../assets/pikachu.svg';
import favorite from '../../assets/star.png';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Container } from "./styles";

export function Header() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { pokemonDetails, favoritePokemondData } = usePokedex();

  const toggleSidebar = () => setSidebarIsOpen(!sidebarIsOpen);

  return (
    <Container>
      <div className="navbar">
        <NavLink to="#" className="menu-bars open">
          <FaIcons.FaBars onClick={toggleSidebar} />
        </NavLink>
      <nav className={sidebarIsOpen ? "active" : ""} onClick={toggleSidebar}>
        <NavLink to="#" className="menu-bars">
          <AiIcons.AiOutlineClose />
        </NavLink>
        <NavLink className={({ isActive }) => isActive ? "active pokedex" : "not-active pokedex"} to="/">
          <img className="pokedex" src={pokeball} alt="pokedex" />
          <p>Pokedex</p>
        </NavLink>
        {Object.keys(pokemonDetails).length === 0
          ? ''
          : <NavLink className={({ isActive }) => isActive ? "active" : "not-active"} to="/pokemon">
            <img className="pokemon" src={pikachu} alt="pokedex" />
            <p>Pokemon</p>
          </NavLink>
        }
        {favoritePokemondData.length === 0
          ? ''
          : <NavLink className={({ isActive }) => isActive ? "active" : "not-active"} to="/favorites">
            <img className="favorites" src={favorite} alt="pokedex" />
            <p>Favorites</p>
          </NavLink>
        }
        <NavLink className={({ isActive }) => isActive ? "active" : "not-active"} to="/about">
          <img className="about" src={about} alt="pokedex" />
          <p>About</p>
        </NavLink>
      </nav>
      </div>
      <Outlet />
    </Container>
  )
}