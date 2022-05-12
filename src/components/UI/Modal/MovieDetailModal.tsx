import { Modal, Card } from 'react-bootstrap';
import { useState } from 'react';
import { IData } from '../../../types';

function MovieDetailModal({ textToShowModal, element }: { textToShowModal: string, element: IData }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p className="mb-3 clickable" onClick={handleShow}>
        {textToShowModal}
      </p>
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>{element.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Card style={{ width: '100%' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MovieDetailModal;