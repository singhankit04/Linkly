import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: 10000,
    withCredentials: true,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong";

    if (error.response) {
      // Server responded with a status code
      const status = error.response.status;

      switch (status) {
        case 400:
          message = error.response.data?.message || "Bad Request";
          break;
        case 401:
          message = "Unauthorized - Please login again";
          // optional: redirect to login
          break;
        case 403:
          message = "Forbidden - You don’t have permission";
          break;
        case 404:
          message = "Resource not found";
          break;
        case 500:
          message = "Server error - Try again later";
          break;
        default:
          message = error.response.data?.message || message;
      }
    } else if (error.request) {
      // Request made but no response
      message = "No response from server. Check your connection.";
    } else {
      // Something else
      message = error.message;
    }

    return Promise.reject({
      ...error,
      customMessage: message,
    });
  }
);

export default axiosInstance;