import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5322"
});

export default api;
