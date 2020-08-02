import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "./authService";

axios.interceptors.response.use(null, (error) => {
  if (error.response.data.code === "auth-005") {
    logout();
    window.location = "/login";
  }

  const expectedError =
    error.response &&
    ((error.response.status >= 400 && error.response.status < 500) ||
      error.response.status === 503);

  if (!expectedError) {
    console.log("Logging the error", error);
    toast.error("Ocorreu um erro inesperado.");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  if (jwt) axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  //patch: axios.patch,
  setJwt,
};
