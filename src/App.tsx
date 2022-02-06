import { Dashboard } from "./pages/Dashboard";
import { GlobalStyle } from "./styles/global";
import { PaginationProvider } from "./hooks/usePagination";

export function App() {
  return (
    <PaginationProvider>
      <Dashboard />
      <GlobalStyle />
    </PaginationProvider>
  );
}