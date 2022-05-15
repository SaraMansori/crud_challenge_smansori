import { useState, useContext } from 'react';
import { TableContext } from '../../context/Table/TableContext';

import { IData, IIndexable } from '../../types';
import { UIText } from '../../shared/constants';

import TableData from './TableData';
import MovieDetailModal from '../UI/Modal/MovieDetailModal';
import { sortData } from '../../shared/utils/helperFunctions';

function TableBody({
  handleDataEdit,
  handleDataDelete
}: {
  handleDataEdit: (editedElement: IData) => void;
  handleDataDelete: (elementToDelete: IData) => void;
}) {
  const { tableData, sortBy, sortOrder, columnKeys } = useContext(TableContext);

  const [editingElement, setEditingElement] = useState<IData | undefined>(
    undefined
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    editingElement && setEditingElement({ ...editingElement, [name]: value });
  };

  const handleSave = (editedElement: IData) => {
    handleDataEdit(editedElement);
    setEditingElement(undefined);
  };

  const sortedData = sortData(tableData, sortBy, sortOrder);

  return (
    <tbody data-testid="movies-table-body">
      {sortedData.length > 0 ? (
        sortedData.map(element => {
          return (
            <tr key={`row-${element.id}`}>
              {columnKeys.map((column, id) => {
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
                    {column === 'title' ? (
                      <MovieDetailModal
                        textToShowModal={(element as IIndexable)[column]}
                        element={element}
                      />
                    ) : (
                      <p>{(element as IIndexable)[column]}</p>
                    )}
                  </td>
                );
              })}

              {editingElement?.id === element.id ? (
                <TableData
                  testId="save"
                  onClick={() => editingElement && handleSave(editingElement)}
                  text={UIText.SAVE}
                  icon={UIText.SAVE}
                />
              ) : (
                <TableData
                  testId="edit"
                  onClick={() => setEditingElement(element)}
                  text={UIText.EDIT}
                  icon={UIText.EDIT}
                />
              )}

              <TableData
                testId="delete"
                onClick={() => handleDataDelete(element)}
                text={UIText.DELETE}
                icon={UIText.DELETE}
              />
            </tr>
          );
        })
      ) : (
        <tr>
          <td className="empty-data" colSpan={columnKeys.length}>
            No results matched your criteria
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default TableBody;
