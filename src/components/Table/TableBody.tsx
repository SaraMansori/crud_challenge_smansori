import { useState } from 'react';

import { IData, IIndexable } from '../../types';
import { UIText } from '../../shared/constants';

import TableData from './TableData';
import MovieDetailModal from '../UI/Modal/MovieDetailModal';

function TableBody({
  columnKeys,
  dataToShow,
  handleMovieEdit,
  handleMovieDelete
}: {
  columnKeys: string[];
  dataToShow: IData[];
  handleMovieEdit: (editedFilm: IData) => void;
  handleMovieDelete: (filmToDelete: IData) => void
}) {
  const [editingElement, setEditingElement] = useState<IData | undefined>(
    undefined
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    editingElement && setEditingElement({ ...editingElement, [name]: value });
  };

  const handleSave = (editedMovie: IData) => {
    handleMovieEdit(editedMovie)
    setEditingElement(undefined);
  };

  return (
    <tbody>
      {dataToShow.map(element => {
        return (
          <tr key={`row-${element.id}`}>
            {columnKeys
              .filter(column => column !== 'id' && column !== 'tableId')
              .map((column, id) => {
                return editingElement?.id === element.id ? (
                  <td key={'table-data' + id}>
                    <input
                      disabled={column === 'id' || column === 'tableId'}
                      type="text"
                      value={(editingElement as IIndexable)[column]}
                      name={column}
                      onChange={e => handleChange(e)}
                    />
                  </td>
                ) : (
                  <td key={'table-data' + id}>
                    {
                      column === 'title' ?
                        <MovieDetailModal
                          textToShowModal={(element as IIndexable)[column]}
                          element={element}
                        />
                        :
                        <p>{(element as IIndexable)[column]}</p>
                    }
                  </td>
                );
              })}

            {editingElement?.id === element.id ? (
              <TableData
                onClick={() => editingElement && handleSave(editingElement)}
                text={UIText.SAVE}
                icon={UIText.SAVE}
              />
            ) : (
              <TableData
                onClick={() => setEditingElement(element)}
                text={UIText.EDIT}
                icon={UIText.EDIT}
              />
            )}

            <TableData
              onClick={() => handleMovieDelete(element)}
              text={UIText.DELETE}
              icon={UIText.DELETE}
            />

          </tr>
        );
      })}

    </tbody >
  );
}

export default TableBody;
