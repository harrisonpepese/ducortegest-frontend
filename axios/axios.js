import axios from "axios";
const url = "https://tcc-barbeiro-backend.herokuapp.com/";
const http = axios.create({
  baseURL: url,
});
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location =
        window.location.protocol + "//" + window.location.host + "/login";
      localStorage.removeItem("token");
    }
    throw error;
  }
);
export default http;
