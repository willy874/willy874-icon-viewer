import { useEffect, useState } from "react";
import { HttpError, createHttpError } from "@/utils"

export function useFetch(input: RequestInfo, payload: RequestInit) {
  const [request, reFetch] = useState(payload);
  const [data, setData] = useState(null);
  const [error, setError] = useState<HttpError | null>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      fetch(input, request)
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          throw res
        })
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
