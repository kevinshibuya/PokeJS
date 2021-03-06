import { Routes, Route } from 'react-router-dom';

import { Pokedex } from '../pages/Pokedex';
import { About } from '../pages/About';
import { App } from '../App';
import { Pokemon } from '../pages/Pokemon';
import { Favorites } from '../pages/Favorites';

export function RootRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Pokedex />} />
          <Route path="about" element={<About />} />
          <Route path="pokemon" element={<Pokemon />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </>
  )
}