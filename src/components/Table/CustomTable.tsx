
import Table from 'react-bootstrap/Table';
import TableHead from './TableHead';
import TableBody from './TableBody';

import { IData } from '../../types';

import './CustomTable.css';

function CustomTable({
  handleMovieEdit,
  handleMovieDelete
}: {
  handleMovieEdit: (editedFilm: IData) => void;
  handleMovieDelete: (filmToDelete: IData) => void
}) {


  return (
    <>
      <Table striped bordered hover responsive>
        <TableHead />
        <TableBody
          handleMovieEdit={handleMovieEdit}
          handleMovieDelete={handleMovieDelete}
        />

      </Table>
    </>
  );
}

export default CustomTable;
