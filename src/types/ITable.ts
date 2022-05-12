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

interface ITableOptions {
  text: string,
  sortBy: string,
  sortOrder: string,
  columnKeys: string[]
}

export type { IData, ITableOptions }
