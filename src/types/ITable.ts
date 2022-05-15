import { SortOrderOptions } from "../shared/constants";
interface IData {
  id?: string;
  tableId?: string;
  image?: string;
  description?: string;
  title: string;
  director: string;
  producer: string;
  releaseDate: string;
  runningTime: string;
  score: string;
}

interface ITableContext {
  sortBy: string,
  sortOrder: SortOrderOptions | string,
  text: string,
  tableData: any[],
  columnKeys: string[]
}

export type { IData, ITableContext }
