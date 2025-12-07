import { useAuthStore } from "@/stores/useAuthStore";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

const axiosClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: { Accept: "application/json" },
});

// ---- Refresh Queue ----
let isRefreshing = false;

let failedQueue: {
  resolve: (value: Promise<AxiosResponse>) => void;
  reject: (err: any) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: any, token?: string) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else {
      if (token && prom.config.headers) {
        prom.config.headers["Authorization"] = `Bearer ${token}`;
      }
      prom.resolve(axiosClient(prom.config));
    }
  });

  failedQueue = [];
};

// Attach token to request
axiosClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  // FormData → multipart
  if (config.data instanceof FormData && config.headers) {
    config.headers["Content-Type"] = "multipart/form-data";
  }

  return config;
});

// Refresh on 401
axiosClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError & { config?: RetryAxiosRequestConfig }) => {
    const originalConfig = error.config;
    if (!originalConfig) return Promise.reject(error);

    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true as any;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalConfig });
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(
          `${baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken, user } = res.data;

        if (!accessToken) {
          throw new Error("Refresh returned no accessToken");
        }

        useAuthStore.getState().setAuth(accessToken, user);

        if (originalConfig.headers) {
          originalConfig.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        processQueue(null, accessToken);

        return axiosClient(originalConfig);
      } catch (err) {
        processQueue(err, undefined);
        useAuthStore.getState().logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;