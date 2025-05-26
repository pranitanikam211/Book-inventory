import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://book-inventory-3.onrender.com"
    : "http://localhost:3001"; // for local dev

const axiosNew = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosNew;
