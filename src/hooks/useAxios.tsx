import axios from "~/utils/axios";
import { useState } from "react";
import { AxiosRequestConfig } from "axios";

const useAxios = (params: AxiosRequestConfig) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const makeRequest = () => {
    setLoading(true);

    axios(params)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   setLoading(true);
  //   axios({ method, url, params })
  //     .then((res) => {
  //       setLoading(false);
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       setError(err);
  //     });
  // }, [url]);

  return { data, loading, error, makeRequest };
};

export default useAxios;
