// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "/", // Base URL updated for JSON server
//   timeout: 5000, // Timeout for requests
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default axiosInstance;
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/", // Base URL updated for JSON server
  timeout: 5000, // Timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
