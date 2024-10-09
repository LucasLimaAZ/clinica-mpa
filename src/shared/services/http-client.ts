import axios from "axios";

const api = axios.create({
  baseURL: "https://eternia.com.br/sistemamepa_api/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
