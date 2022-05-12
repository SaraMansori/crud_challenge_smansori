import { IfetchedData } from "../types";

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
