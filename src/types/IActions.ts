import { TableActionsKind } from '../shared/constants';

interface ITableAction {
  type: TableActionsKind;
  payload?: any;
}

export type { ITableAction };
