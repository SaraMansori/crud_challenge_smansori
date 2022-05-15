
import Table from 'react-bootstrap/Table';
import TableHead from './TableHead';
import TableBody from './TableBody';

import { IData } from '../../types';

import './CustomTable.css';

function CustomTable({
  handleDataEdit,
  handleDataDelete
}: {
  handleDataEdit: (editedElement: IData) => void;
  handleDataDelete: (elementToDelete: IData) => void
}) {


  return (
    <Table striped bordered hover responsive data-testid="movies-table">
      <TableHead />
      <TableBody
        handleDataEdit={handleDataEdit}
        handleDataDelete={handleDataDelete}
      />
    </Table>
  );
}

export default CustomTable;
