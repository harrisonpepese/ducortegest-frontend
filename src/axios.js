import axios from "axios";
//const url = "https://tcc-barbeiro-backend.herokuapp.com/"
const url = "http://localhost:3000/";
const http = axios.create({
  baseURL: url,
});
export default http;
