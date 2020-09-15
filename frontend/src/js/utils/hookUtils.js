import { useState, useEffect, useContext } from "react";

import { MainContext, AuthContext } from "./contextUtils";

export const useMainContext = () => useContext(MainContext);
export const useAuth = () => useContext(AuthContext);

export const useFetch = (endPoint, options = {}) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      await endPoint(options)
        .then((res) => {
          setIsLoading(false);
          setData(res?.data);
        })
        .catch((error) => {
          setHasError(true);
          setIsLoading(false);
          setErrorMessage(error?.response?.data.message);
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
