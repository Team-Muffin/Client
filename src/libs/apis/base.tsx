// base.ts
import axios from "axios";
import { GlobalResponse, TokenInfoResponse } from "./responses/response";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000/api",
});

instance.interceptors.request.use(
  async (config) => {
    const authInfoString = window.localStorage.getItem("auth2-storage");
    const authInfo = JSON.parse(authInfoString ? authInfoString : "{}").state;

    const accessToken = authInfo ? authInfo.accessToken : null;
    const refreshToken = authInfo ? authInfo.refreshToken : null;

    if (config.url === "/user-service/reissue" && refreshToken) {
      config.headers.Authorization = `Bearer ${refreshToken}`;
    } else if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    const originalRequest = error.config;

    if (error.response.data) {
      const { canRefresh } = error.response.data;

      if (canRefresh) {
        try {
          const res = await instance.get<GlobalResponse<TokenInfoResponse>>(
            "/user-service/reissue"
          );

          const authInfoString = window.localStorage.getItem("auth2-storage");
          const authInfo = JSON.parse(
            authInfoString ? authInfoString : "{}"
          ).state;
          authInfo.state.accessToken = res.data.data.accessToken;
          authInfo.state.refreshToken = res.data.data.refreshToken;
          window.localStorage.setItem(
            "auth2-storage",
            JSON.stringify(authInfo)
          );

          return instance(originalRequest);
        } catch (err) {
          window.localStorage.clear();
          return Promise.reject(err);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
