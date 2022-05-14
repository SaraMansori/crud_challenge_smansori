import { SortOptions } from "../shared/constants";
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

interface ITableState {
  sortBy: string,
  sortOrder: SortOptions,
  text: string,
  tableData: any[],
  columnKeys: string[]
}

export type { IData, ITableState }
