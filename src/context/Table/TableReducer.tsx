import { SortOptions, TableActionsKind } from '../../shared/constants';

interface ITableState {
  sortBy: string,
  sortOrder: string,
  text: string,
  tableData: any[],
  columnKeys: string[]
}

interface ITableAction {
  type: TableActionsKind;
  payload?: any;
}

export const TableReducer = (state: ITableState, action: ITableAction) => {
  const { payload } = action;
  switch (action.type) {
    case TableActionsKind.CHANGE_SORT_ORDER:
      return {
        ...state, sortOrder: state.sortOrder === SortOptions.ASC ? SortOptions.DESC : SortOptions.ASC
      };
    case TableActionsKind.CHANGE_SORT_BY:
      return { ...state, sortBy: payload || '' };
    case TableActionsKind.CHANGE_SEARCHED_TEXT:
      return { ...state, text: payload || '' };
    case TableActionsKind.CHANGE_TABLE_DATA:
      return { ...state, tableData: payload || [] };
    case TableActionsKind.CHANGE_COLUMN_KEYS:
      return { ...state, columnKeys: payload || [] };
    default:
      return state
  }
}