
import MainPage from "./pages/MoviesList";
import { TableContextProvider } from "./context/Table/TableContext";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Studio Ghibli Movies</h1>
      </header>
      <TableContextProvider>
        <main>
          <MainPage />
        </main>
      </TableContextProvider>
    </div>
  );
}

export default App;
