import { Modal, ListGroup, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { IData } from '../../../types';
import './Modal.css';

function MovieDetailModal({ textToShowModal, element: { title, description, image } }: { textToShowModal: string, element: IData }) {

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
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className='d-flex align-items-center'>
            <Col sm="6">
              <img className='modal-img' src={image} alt={`${title} poster`} />
            </Col>
            <Col sm="6">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  {description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MovieDetailModal;