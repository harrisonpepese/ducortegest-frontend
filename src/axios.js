import axios from "axios";
const http = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:3000/",
});
export default http;
