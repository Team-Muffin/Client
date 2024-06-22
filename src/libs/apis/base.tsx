// base.ts
import axios from 'axios';
import {useAuthStore} from '../../store/useAuthStore';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api',
});

instance.interceptors.request.use(
  async (config) => {
    const { accessToken, refreshTokens } = useAuthStore.getState();
    if (accessToken != null) config.headers.Authorization = `Bearer ${accessToken}`;
  
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
    const { refreshTokens, logout } = useAuthStore.getState();
    
    if (error.response && error.response.data) {
      const { success, canRefresh } = error.response.data;
      
      // 토큰 문제 발생시 처리
      if (!success && canRefresh && !originalRequest._retry) {
        originalRequest._retry = true;
        await refreshTokens();
        const { accessToken } = useAuthStore.getState();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } else if (!success && !canRefresh) {
        // 리프레시 토큰 갱신 불가 시 로그아웃 처리
        logout();
        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
      }
    }
    
    return Promise.reject(error);
  }
);

export default instance;
