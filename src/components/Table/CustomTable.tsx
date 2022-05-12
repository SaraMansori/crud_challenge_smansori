// import { useState } from 'react';

import Table from 'react-bootstrap/Table';
import TableHead from './TableHead/TableHead';
import TableBody from './TableBody/TableBody';

import { IData, IIndexable } from '../../types';
import { SortOptions } from '../../shared/constants';

import './Table.module.css';

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
      <Table striped bordered hover>
        <TableHead
          columnKeys={columnKeys}
          setTableOptions={setTableOptions}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
        <TableBody
          dataToShow={sortBy !== '' ? sortData(data, sortBy) : data}
          columnKeys={columnKeys}
          handleMovieEdit={handleMovieEdit}
          handleMovieDelete={handleMovieDelete}
        />
      </Table>
    </>
  );
}

export default CustomTable;
