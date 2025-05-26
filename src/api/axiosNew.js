import axios from "axios";

const axiosNew = axios.create({
  baseURL: "http://localhost:3001/", // Correct base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosNew;
