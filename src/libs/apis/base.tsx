import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000/api",
});

instance.interceptors.response.use(
  function (response: any) {
    return response;
  },
  function (error: any) {
    console.log(error);
    if (error.response.status === 500) {
    }
    return Promise.reject(error);
  }
);

export default instance;
