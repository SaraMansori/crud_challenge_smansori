import MainPage from './pages/MoviesList';
import './App.css';
import { TableContextProvider } from './context/Table/TableContext';
import { SortOrderOptions } from './shared/constants';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://i.pinimg.com/originals/b4/00/a2/b400a2b4ca3da09dbee9ea425e3bd857.jpg"
          alt=""
        />
      </header>
      <main>
        <TableContextProvider
          options={{
            initialSortBy: 'releaseDate',
            initialSortOrder: SortOrderOptions.DESC
          }}
        >
          <MainPage />
        </TableContextProvider>
      </main>
    </div>
  );
}

export default App;
