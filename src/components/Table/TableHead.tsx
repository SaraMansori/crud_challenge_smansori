import { ITableOptions } from '../../types';
import { columnNameRegex } from '../../utils/regex';
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { SortOptions } from '../../shared/constants';

function TableHead({ columnKeys, sortBy, sortOrder, setTableOptions }: { columnKeys: string[], sortOrder: string, sortBy: string, setTableOptions: any }) {

  /**
   * Returns the string with spaces before the upperCase letters and capitalizes the first
   * originalTitle => Original Title
   * @param {string} word
   * @returns {string}
   */

  const parseName = (word: string) => word.charAt(0).toUpperCase() + word.slice(1).replace(columnNameRegex, '$1$4 $2$3$5')

  const updateSorting = (columnName: string) => {
    if (columnName === sortBy) {
      const newSortOrder = sortOrder === SortOptions.ASC ? SortOptions.DESC : SortOptions.ASC
      setTableOptions((prevState: ITableOptions) => ({ ...prevState, sortOrder: newSortOrder }));
    }
    setTableOptions((prevState: ITableOptions) => ({ ...prevState, sortBy: columnName }));
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
          .filter(column => column !== 'id' && column !== 'tableId')
          .map((column, i) => (
            <th onClick={() => updateSorting(column)} key={'column-name' + i}>
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
