import axios from "axios";
//const url = "https://tcc-barbeiro-backend.herokuapp.com/"
const url = "http://localhost:3000/";
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
    return error;
  }
);
export default http;
