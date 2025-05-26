import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://your-json-server.onrender.com"
    : "http://localhost:3001";

const axiosNew = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosNew;
