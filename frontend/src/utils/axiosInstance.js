import axios from "axios";

let currentToken = null;

export const setAccessToken = (token) => {
  currentToken = token;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 10000,
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  if (currentToken) {
    config.headers.Authorization = `Bearer ${currentToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    let message = "Something went wrong";

    if (error.response) {
      // Server responded with a status code
      const status = error.response.status;

      switch (status) {
        case 400:
          message = error.response.data?.message || "Bad Request";
          break;
        case 401:
          try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE}/auth/refresh`, {}, {
              withCredentials: true
            });

            setAccessToken(res.data.accessToken);

            error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
            return axiosInstance(error.config);
          } catch (err) {
            message = "Session expired"
          }
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