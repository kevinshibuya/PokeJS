import { GlobalStyle } from "./styles/global";
import { PokedexProvider } from "./hooks/usePokedex";
import { Header } from "./components/Header";
import { usePokedex } from './hooks/usePokedex';

export function App() {
  const { backgroundColor } = usePokedex();

  return (
    <PokedexProvider>
      <Header />
      <GlobalStyle backgroundColor={backgroundColor} />
    </PokedexProvider>
  );
}