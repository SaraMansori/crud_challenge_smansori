import { useState, useEffect, useContext } from 'react';
import { TableContext } from '../context/Table/TableContext';
import { useFetch } from '../hooks/useFetch';

import { IData, IIndexable } from '../types';

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

  const hiddenColumns = ['id', 'tableId', 'image', 'description']
  const [movies, setMovies] = useState<IData[]>([]);
  const { text, changeTableData, columnKeys, changeColumnKeys } = useContext(TableContext)

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

    const filteredKeys = movies.length > 0 ? Object.keys(movies[0]).filter(key => !hiddenColumns.includes(key)) : []

    const filteredMovies = movies
      .filter(movie =>
        filteredKeys
          .some(key =>
            (movie as IIndexable)[key].toLowerCase().includes(text)
          )
      )

    changeTableData(filteredMovies)
  }, [movies, text])

  useEffect(() => {

    if (data) {
      const formattedData = parseAPIData(data)
      setMovies(formattedData);
      if (formattedData.length > 0) {
        changeColumnKeys(Object.keys(formattedData[0]))
      }
    }
  }, [data])

  return (
    <Container>
      <Row className="justify-content-md-center" fluid>
        <Col md='12'>
          <>
            <TableHeader
              handleMovieSubmit={handleMovieSubmit}
            />

            {loading ?
              <p>Loading...</p>
              :
              <CustomTable
                handleMovieEdit={handleMovieEdit}
                handleMovieDelete={handleMovieDelete}
              />
            }
          </>
        </Col>
      </Row>
    </Container>

  );
}

export default MoviesList;
