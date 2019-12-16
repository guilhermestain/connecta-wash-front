import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.90.211:5322"
});

export default api;
