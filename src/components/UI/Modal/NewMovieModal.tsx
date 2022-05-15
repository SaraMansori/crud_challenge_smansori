import { Button, Form, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { IData } from '../../../types';

function NewMovieModal({ handleMovieSubmit }: { handleMovieSubmit: (newMovie: IData) => void }) {

  const initialState = {
    title: '',
    tableId: '',
    releaseDate: '',
    runningTime: '',
    director: '',
    producer: '',
    score: ''
  }

  const [show, setShow] = useState(false);
  const [movieData, setMovieData] = useState(initialState)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e: any) => {
    const { name, value } = e.currentTarget;
    setMovieData({ ...movieData, [name]: value.toString() })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    handleMovieSubmit(movieData)
    setMovieData(initialState)
    handleClose()
  }

  return (
    <>
      <Button className="mb-3" style={{ width: '100%' }} variant="dark" onClick={handleShow}>
        Add new movie
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Add a new movie</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="movieTitle">
              <Form.Label>Title of the movie</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={movieData.title}
                onChange={(e) => handleInputChange(e as any)}
                minLength={1}
                required
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="releaseDate">
              <Form.Label>Release Year</Form.Label>
              <Form.Control
                name="releaseDate"
                value={movieData.releaseDate}
                onChange={(e) => handleInputChange(e)}
                type="number" min="1900" max="2099" step="1"
                required
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="releaseDate">
              <Form.Label>Running Time (minutes)</Form.Label>
              <Form.Control
                name="runningTime"
                value={movieData.runningTime}
                onChange={(e) => handleInputChange(e)}
                type="number"
                min="0"
                required
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="releaseDate">
              <Form.Label>Director</Form.Label>
              <Form.Control
                name="director"
                value={movieData.director}
                onChange={(e) => handleInputChange(e)}
                type="text"
                minLength={5}
                required
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="releaseDate">
              <Form.Label>Producer</Form.Label>
              <Form.Control
                name="producer"
                value={movieData.producer}
                onChange={(e) => handleInputChange(e)}
                type="text"
                minLength={5}
                required
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="releaseDate">
              <Form.Label>Score</Form.Label>
              <Form.Control
                name="score"
                value={movieData.score}
                onChange={(e) => handleInputChange(e)}
                type="number"
                min={0}
                required
                autoFocus
              />
            </Form.Group>

            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NewMovieModal;