import { useState, useEffect, useMemo } from 'react';
import { useFetch } from '../hooks/useFetch';

import { IData, ITableOptions, IIndexable } from '../types';

import CustomTable from '../components/Table/CustomTable';
import TableHeader from '../components/Table/TableHeader';
import { Container, Row, Col } from 'react-bootstrap';

import {
  getAllMovies,
  createMovie,
  editOneMovie,
  deleteOneMovie
} from '../services/moviesService';

import { parseAPIData } from '../utils';

function MoviesList() {

  const [movies, setMovies] = useState<IData[]>([]);
  const hiddenColumns = ['id', 'tableId', 'image', 'description']

  const [tableOptions, setTableOptions] = useState<ITableOptions>({
    text: '',
    sortBy: '',
    sortOrder: '',
    columnKeys: []
  })

  const newFilteredMovies = useMemo(() => {

    const filteredKeys = movies.length > 0 ? Object.keys(movies[0]).filter(key => !hiddenColumns.includes(key)) : []

    return movies
      .filter(movie =>
        filteredKeys
          .some(key =>
            (movie as IIndexable)[key].toLowerCase().includes(tableOptions.text)
          )
      )
  }, [movies, tableOptions.text])

  const handleSearchBarTextChange = (value: string) => {
    setTableOptions({ ...tableOptions, text: value });
  };

  const handleMovieSubmit = (newMovie: IData) => {
    createMovie(newMovie)
      .then(({ data }) => console.log(data))
      .catch(err => {
        throw new Error(err);
      });
  };

  const handleMovieEdit = (editedFilm: IData) => {
    editedFilm.id &&
      editOneMovie(editedFilm.id, editedFilm)
        .then(({ data }) => {
          const indexOfMovie = [...movies].findIndex((film) => film.id === data.id)
          setMovies((prevState) => {
            const moviesCopy = [...prevState]
            moviesCopy.splice(indexOfMovie, 1, parseAPIData([data])[0])
            return moviesCopy
          })
        })
        .catch(err => {
          throw new Error(err);
        });
  };

  const handleMovieDelete = (movieToDelete: IData) => {
    movieToDelete.id &&
      deleteOneMovie(movieToDelete.id)
        .then(({ data }) => {
          const indexOfMovie = [...movies].findIndex((film) => film.id === data.id)
          setMovies((prevState) => {
            const moviesCopy = [...prevState]
            moviesCopy.splice(indexOfMovie, 1)
            return moviesCopy
          })
        })
        .catch(err => {
          throw new Error(err);
        });
  }

  const { data, error, loading } = useFetch(getAllMovies)

  useEffect(() => {

    if (data) {
      const formattedData = parseAPIData(data)
      setMovies(formattedData);
      if (formattedData.length > 0) {
        setTableOptions({
          ...tableOptions, columnKeys: Object.keys(formattedData[0])
        })
      }
    }

  }, [data])

  return (
    <Container>
      <Row className="justify-content-md-center" fluid>
        <Col md='12'>
          {tableOptions.columnKeys.length > 0 && (
            <>
              <TableHeader
                handleMovieSubmit={handleMovieSubmit}
                handleSearchBarTextChange={handleSearchBarTextChange}
                tableOptions={tableOptions}
              />

              {loading ?

                <p>Loading...</p>

                :

                <CustomTable
                  data={newFilteredMovies}
                  columnKeys={tableOptions.columnKeys}
                  sortBy={tableOptions.sortBy}
                  sortOrder={tableOptions.sortOrder}
                  setTableOptions={setTableOptions}
                  handleMovieEdit={handleMovieEdit}
                  handleMovieDelete={handleMovieDelete}
                />
              }
            </>
          )}
        </Col>
      </Row>
    </Container>

  );
}

export default MoviesList;
