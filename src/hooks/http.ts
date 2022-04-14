import { useEffect, useState } from "react";
import { HttpError, createHttpError, http } from "@/utils"
import { AxiosRequestConfig } from 'axios'

export function useFetch<T, E = null>(input: string, payload?: AxiosRequestConfig) {
  const [request, reFetch] = useState(payload);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<HttpError<E> | null>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      http.get<T>(input, request)
        .then((res) => {
          setData(res);
          setLoading(false);
        })
    } catch (error) {
      setLoading(false);
      setError(createHttpError(error));
    }
  }, [input, request])
  return {
    data,
    error,
    loading,
    reFetch
  }
}
