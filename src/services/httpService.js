import axios from "axios";
import { toast } from "react-toastify";
// import logger from "./logService.js";

axios.defaults.baseURL = "http://localhost:3001/fakfajzer"; //process.env.REACT_APP_API_URL;
// logger.init(); // initalisation my own logService module


//This will execute when got response with an error
axios.interceptors.response.use(null, error => {
  toast.error("Can't connect to API");
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // logger.log(error);
    toast.error("An unexpected error occured.");
  }
  return Promise.reject(error);
});

// function setJwt(jwt) {
//   axios.defaults.headers.common["x-auth-token"] = jwt;
// }

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  // setJwt
};
