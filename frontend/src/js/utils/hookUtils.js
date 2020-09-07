/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */

import { useState, useEffect } from "react";
import { requestPlaceholderData } from "../apis/apiRequests";

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      await requestPlaceholderData(url, options)
        .then((res) => {
          setIsLoading(false);
          setData(res.data);
        })
        .catch((error) => {
          setHasError(true);
          setIsLoading(false);
          setErrorMessage(error?.response.data.message);
        });
    };

    fetchData();
  }, []);

  return [data, isLoading, hasError, errorMessage];
};
