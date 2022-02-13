import { GlobalStyle } from "./styles/global";
import { PokedexProvider } from "./hooks/usePokedex";
import { Header } from "./components/Header";

export function App() {
  return (
    <PokedexProvider>
      <Header />
      <GlobalStyle />
    </PokedexProvider>
  );
}