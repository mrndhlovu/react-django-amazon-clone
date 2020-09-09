/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */

import { useState, useEffect, useContext } from "react";
import { requestPlaceholderData } from "../apis/apiRequests";

import { MainContext } from "./contextUtils";

export const useMainContext = () => useContext(MainContext);

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

export const useFormInput = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return [formData, handleChange];
};
