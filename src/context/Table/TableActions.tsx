import { TableActionsKind } from '../../shared/constants';

export const TableActions = {
  CHANGE_SORT_ORDER: () => ({ type: TableActionsKind.CHANGE_SORT_ORDER }),
  CHANGE_SORT_BY: (payload: string) => ({
    type: TableActionsKind.CHANGE_SORT_BY,
    payload
  }),
  CHANGE_SEARCHED_TEXT: (payload: string) => ({
    type: TableActionsKind.CHANGE_SEARCHED_TEXT,
    payload
  }),
  CHANGE_TABLE_DATA: (payload: any[]) => ({
    type: TableActionsKind.CHANGE_TABLE_DATA,
    payload
  }),
  CHANGE_COLUMN_KEYS: (payload: string[]) => ({
    type: TableActionsKind.CHANGE_COLUMN_KEYS,
    payload
  })
};
