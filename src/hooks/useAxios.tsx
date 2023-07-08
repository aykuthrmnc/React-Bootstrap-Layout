import axios from "~/utils/axios";
import { useEffect, useState } from "react";

export interface AxiosObject {
  url?: any;
  method: string;
  parameters?: any;
}

const useAxios = ({ url, method = "get", parameters = null }: AxiosObject) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios(url, { method, data: parameters })
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [url]);

  return { data, loading, error };
};

export default useAxios;
