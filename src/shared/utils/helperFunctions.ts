import { IfetchedData } from "../../types";
import { IIndexable, IData } from "../../types";
import { SortOptions } from "../constants";

export const parseAPIData = (data: IfetchedData[]) => {
  return data.map(
    (
      {
        id,
        title,
        director,
        producer,
        release_date,
        running_time,
        rt_score,
        image,
        description
      }: IfetchedData,
      tableId: number
    ) => ({
      id,
      tableId: tableId.toString(),
      title,
      releaseDate: release_date,
      runningTime: running_time,
      director,
      producer,
      score: rt_score,
      image,
      description
    })
  );
}

export const sortData = (dataToSort: IData[], sortBy: string, sortOrder: string) => {
  const sortedArr = [...dataToSort].sort((a, b) => {
    return (a as IIndexable)[sortBy]?.localeCompare(
      (b as IIndexable)[sortBy],
      'en',
      { numeric: true, ignorePunctuation: true }
    );
  });

  if (sortOrder === SortOptions.ASC) {
    return sortedArr;
  } else {
    return sortedArr.reverse();
  }
};