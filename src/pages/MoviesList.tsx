import { useState, useEffect, useContext } from 'react';
import { TableContext } from '../context/Table/TableContext';
import { useFetch } from '../hooks/useFetch';

import { IData, IIndexable } from '../types';

import CustomTable from '../components/Table/CustomTable';
import TableHeader from '../components/Table/TableHeader';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import {
  getAllMovies,
  createMovie,
  editOneMovie,
  deleteOneMovie
} from '../services/moviesService';

import { parseAPIData } from '../shared/utils';

// TODO: Move hiddenColumns al contexto

function MoviesList() {

  const hiddenColumns = ['id', 'tableId', 'image', 'description']

  const [movies, setMovies] = useState<IData[]>([]);
  const { text, changeTableData, changeColumnKeys } = useContext(TableContext)

  const handleMovieSubmit = (newMovie: IData) => {
    createMovie(newMovie)
      .then(({ data }) => {
        setMovies((prevState) => [...prevState, parseAPIData([data])[0]])
      })
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

  const { data: rawData, error, loading } = useFetch(getAllMovies)

  useEffect(() => {

    const filteredKeys = movies.length > 0 ?
      Object.keys(movies[0]).filter(key => !hiddenColumns.includes(key))
      :
      []

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

    if (rawData) {
      const formattedData = parseAPIData(rawData)
      setMovies(formattedData);
      if (formattedData.length > 0) {
        changeColumnKeys(Object.keys(formattedData[0]))
      }
    }
  }, [rawData])

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md='12'>
          <>
            <TableHeader
              handleMovieSubmit={handleMovieSubmit}
            />

            {loading ?
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              :
              <CustomTable
                handleDataEdit={handleMovieEdit}
                handleDataDelete={handleMovieDelete}
              />
            }
          </>
        </Col>
      </Row>
    </Container>

  );
}

export default MoviesList;
