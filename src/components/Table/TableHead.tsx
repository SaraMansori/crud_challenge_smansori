import { columnNameRegex } from '../../utils/regex';
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { SortOptions } from '../../shared/constants';
import { useContext } from 'react';
import { TableContext } from '../../context/Table/TableContext';

function TableHead() {

  /**
   * Returns the string with spaces before the upperCase letters and capitalizes the first
   * originalTitle => Original Title
   * @param {string} word
   * @returns {string}
   */

  const hiddenColumns = ['id', 'tableId', 'image', 'description']

  const { changeSortBy, changeSortOrder, sortBy, sortOrder, columnKeys } = useContext(TableContext)


  const parseName = (word: string) => word.charAt(0).toUpperCase() + word.slice(1).replace(columnNameRegex, '$1$4 $2$3$5')

  const handleSorting = (columnName: string) => {
    if (columnName === sortBy) {
      changeSortOrder()
    }
    changeSortBy(columnName)
  }

  const sortIcon = (columnName: string) => {
    return columnName === sortBy && sortOrder === SortOptions.ASC ?
      <BsCaretUpFill />
      :
      <BsCaretDownFill />
  }

  return (
    <thead>
      <tr>
        {columnKeys
          .filter(column => !hiddenColumns.includes(column))
          .map((column, i) => (
            <th className="pointer" onClick={() => handleSorting(column)} key={'column-name' + i}>
              {
                column === sortBy && sortIcon(column)
              }
              {parseName(column)}
            </th>
          ))}
      </tr>
    </thead>
  );
}

export default TableHead;
