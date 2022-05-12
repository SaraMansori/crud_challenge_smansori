
import Table from 'react-bootstrap/Table';
import TableHead from './TableHead';
import TableBody from './TableBody';

import { IData, IIndexable } from '../../types';
import { SortOptions } from '../../shared/constants';

import './CustomTable.css';

function CustomTable({
  data,
  columnKeys,
  sortBy,
  sortOrder,
  setTableOptions,
  handleMovieEdit,
  handleMovieDelete
}: {
  data: IData[];
  columnKeys: string[];
  sortBy: string,
  sortOrder: string,
  setTableOptions: any,
  handleMovieEdit: (editedFilm: IData) => void;
  handleMovieDelete: (filmToDelete: IData) => void
}) {
  const sortData = (dataToSort: IData[], sortName: string) => {
    const sortedArr = [...dataToSort].sort((a, b) => {
      return (a as IIndexable)[sortName]?.localeCompare(
        (b as IIndexable)[sortName],
        'en',
        { numeric: true, ignorePunctuation: true }
      );
    });

    if (sortOrder === SortOptions.ASC) {
      return sortedArr;
    } else {
      return sortedArr.reverse();
    }
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <TableHead
          columnKeys={columnKeys}
          setTableOptions={setTableOptions}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
        {data.length > 0 ?
          <TableBody
            dataToShow={sortBy !== '' ? sortData(data, sortBy) : data}
            columnKeys={columnKeys}
            handleMovieEdit={handleMovieEdit}
            handleMovieDelete={handleMovieDelete}
          />
          :
          <tr>
            <td className="empty-data" colSpan={columnKeys.length}>No results matched your criteria</td>
          </tr>
        }

      </Table>
    </>
  );
}

export default CustomTable;
