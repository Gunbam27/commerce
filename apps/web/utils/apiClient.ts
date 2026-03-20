import axios from "axios";
import type { paths } from "../src/api/schema";
import Cookies from "js-cookie";
import { useAuthStore } from "../features/auth/store/useAuthStore";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const message = error.response?.data?.message;

    if (message === "TOKEN_EXPIRED" && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

        isRefreshing = true;

        try {
          const response = await axios.post(`${apiClient.defaults.baseURL}/auth/refresh`, {}, {
            withCredentials: true,
          });
          const newAccessToken = response.data.accessToken;
          // Zustand 스토어 업데이트 (토큰만 갱신)
          useAuthStore.getState().setToken(newAccessToken);
          onRefreshed(newAccessToken);

          isRefreshing = false;

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);

        } catch (refreshError) {
          isRefreshing = false;
          useAuthStore.getState().logoutAction();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

export type ApiPaths = paths;
