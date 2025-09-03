import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api", // Change default as needed
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
