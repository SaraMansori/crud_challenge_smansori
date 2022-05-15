import { SortOrderOptions, TableActionsKind } from '../../shared/constants';
import { ITableContext, ITableAction } from '../../types'

export const TableReducer = (state: ITableContext, action: ITableAction) => {
  const { payload } = action;
  switch (action.type) {
    case TableActionsKind.CHANGE_SORT_ORDER:
      return {
        ...state, sortOrder: state.sortOrder === SortOrderOptions.ASC ? SortOrderOptions.DESC : SortOrderOptions.ASC
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