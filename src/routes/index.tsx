import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Pokedex } from '../pages/Pokedex';
import { About } from '../pages/About';
import { App } from '../App';

export function RootRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="pokedex" element={<Pokedex />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </>
  )
}