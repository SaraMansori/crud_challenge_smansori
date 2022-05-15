import { TableContextProvider, TableContext } from '../../context/Table';
import { render } from '@testing-library/react';
import React, { useContext } from 'react';
import { IIndexable } from '../../types';
import { newContextMockData } from '../../context/Table/__mock__/contextMockData';

const AllTheProviders = ({ children }: { children: React.ReactElement }) => {
  return <TableContextProvider>{children}</TableContextProvider>;
};
export const customRender = (ui: React.ReactElement) =>
  render(ui, { wrapper: AllTheProviders });

export const customRenderWithValue = (
  ui: React.ReactElement,
  { providerProps }: { providerProps: any }
) => {
  return render(
    <TableContext.Provider value={providerProps}> {ui} </TableContext.Provider>
  );
};

export const TestConsumer = () => {
  const {
    sortBy,
    sortOrder,
    text,
    tableData,
    columnKeys,
    changeSortOrder,
    changeSortBy,
    changeSearchedText,
    changeTableData,
    changeColumnKeys
  } = useContext(TableContext);

  const { tableData: newTableData, columnKeys: newColumnKeys } =
    newContextMockData;

  return (
    <>
      <h1>Hello there!</h1>
      <p data-testid="sortBy">{sortBy}</p>
      <p data-testid="sortOrder">{sortOrder}</p>
      <p data-testid="text">{text}</p>

      {tableData.map((data, i) => {
        return (
          <ul key={i}>
            {Object.keys(data).map((key, i2) => (
              <li key={`data-${i2}`} data-testid={`tableData-${key}-${i}`}>
                {(data as IIndexable)[key]}
              </li>
            ))}
          </ul>
        );
      })}

      <ul>
        {columnKeys.map((value, i) => {
          return (
            <li key={`columnKey-${i}`} data-testid={`columnKey-${value}`}>
              {value}
            </li>
          );
        })}
      </ul>

      <section>
        <button onClick={changeSortOrder}>
          Change sort order to ascending
        </button>
        <button onClick={() => changeSortBy('director')}>
          Change sort by to director
        </button>
        <button onClick={() => changeSearchedText('testSearchedText')}>
          Change searched text
        </button>
        <button onClick={() => changeTableData(newTableData)}>
          Change table data
        </button>
        <button onClick={() => changeColumnKeys(newColumnKeys)}>
          Change column keys
        </button>
      </section>
    </>
  );
};
