import axios from "axios";

const api = axios.create({
  baseURL: "https://eternia.com.br/sistemamepa/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
