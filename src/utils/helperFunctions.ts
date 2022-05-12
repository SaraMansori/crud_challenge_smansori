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
        rt_score
      }: IfetchedData,
      tableId: number
    ) => ({
      id: id,
      tableId: tableId.toString(),
      title: title,
      releaseDate: release_date,
      runningTime: running_time,
      director: director,
      producer: producer,
      score: rt_score
    })
  );
}
