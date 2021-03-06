import React, { ReactElement, useMemo, useReducer } from 'react';
import { TableReducer } from './TableReducer';
import { TableActions } from './TableActions';

export const initialState = {
  sortBy: '',
  sortOrder: '',
  text: '',
  tableData: [
    {
      id: '',
      tableId: '',
      image: '',
      description: '',
      title: '',
      director: '',
      producer: '',
      releaseDate: '',
      runningTime: '',
      score: ''
    }
  ],
  columnKeys: [''],
  changeSortOrder: () => {},
  changeSortBy: (newSortBy: string) => {},
  changeSearchedText: (text: string) => {},
  changeTableData: (data: any[]) => {},
  changeColumnKeys: (keys: string[]) => {}
};

export const TableContext = React.createContext(initialState);

export const TableContextProvider = ({
  children,
  options
}: {
  children: ReactElement;
  options?: { initialSortBy?: string; initialSortOrder?: string };
}) => {
  const adaptedInitialState = {
    ...initialState,
    sortBy: options?.initialSortBy || initialState.sortBy,
    sortOrder: options?.initialSortOrder || initialState.sortOrder
  };

  const [state, dispatch] = useReducer(TableReducer, adaptedInitialState);
  const { sortBy, sortOrder, text, tableData, columnKeys } = state;

  const changeSortOrder = () => {
    dispatch(TableActions.CHANGE_SORT_ORDER());
  };

  const changeSortBy = (newSortBy: string) => {
    dispatch(TableActions.CHANGE_SORT_BY(newSortBy));
  };
  const changeSearchedText = (text: string) =>
    dispatch(TableActions.CHANGE_SEARCHED_TEXT(text));
  const changeTableData = (data: any[]) =>
    dispatch(TableActions.CHANGE_TABLE_DATA(data));
  const changeColumnKeys = (keys: string[]) =>
    dispatch(TableActions.CHANGE_COLUMN_KEYS(keys));

  // It is necessary to use a memo to prevent updates on every render.
  const contextValue = useMemo(() => {
    return {
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
    };
  }, [state, dispatch]);

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
};
