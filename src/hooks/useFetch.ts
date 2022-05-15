import { useState, useEffect } from 'react';
import { AxiosError, AxiosPromise, AxiosResponse } from 'axios';

export const useFetch = (axiosService: () => AxiosPromise) => {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {

    setLoading(true)
    setData(null);
    setError(null);

    axiosService()
      .then((res: AxiosResponse) => {
        setLoading(false);
        res.data && setData(res.data);
      })
      .catch((err: AxiosError) => {
        setLoading(false)
        setError(err)
      })

  }, [axiosService])

  return { data, loading, error }

}
