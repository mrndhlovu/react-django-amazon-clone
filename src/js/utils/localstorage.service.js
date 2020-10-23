const LocalStorageService = (() => {
  let _service;
  const getService = () => {
    if (!_service) {
      return _service;
    }
    return _service;
  };
  const setToken = (accessToken) => localStorage.setItem("access", accessToken);
  const getAccessToken = () => localStorage.getItem("access");
  const clearToken = () => localStorage.removeItem("access");

  return {
    getService,
    setToken,
    getAccessToken,
    clearToken,
  };
})();
export default LocalStorageService;
