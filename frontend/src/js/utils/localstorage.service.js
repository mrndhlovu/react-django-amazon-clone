const LocalStorageService = (() => {
  let _service;
  const getService = () => {
    if (!_service) {
      return _service;
    }
    return _service;
  };
  const setToken = (tokenObj) => {
    localStorage.setItem("access", tokenObj.access);
    localStorage.setItem("refresh", tokenObj.refresh);
  };
  const getAccessToken = () => {
    return localStorage.getItem("access");
  };
  const getRefreshToken = () => {
    return localStorage.getItem("refresh");
  };
  const clearToken = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  return {
    getService,
    setToken,
    getAccessToken,
    getRefreshToken,
    clearToken,
  };
})();
export default LocalStorageService;
