import type { AxiosRequestConfig } from "axios";
import axiosClient from "./axios";

export interface HttpOptions {
  params?: Record<string, any>;
  headers?: Record<string, any>;
  config?: AxiosRequestConfig;
}

const http = {
  get<T = any>(url: string, options?: HttpOptions) {
    return axiosClient.get<T>(url, { params: options?.params, headers: options?.headers, ...options?.config });
  },

  post<T = any>(url: string, data?: any, options?: HttpOptions) {
    return axiosClient.post<T>(url, data, { params: options?.params, headers: options?.headers, ...options?.config });
  },

  put<T = any>(url: string, data?: any, options?: HttpOptions) {
    return axiosClient.put<T>(url, data, { params: options?.params, headers: options?.headers, ...options?.config });
  },

  delete<T = any>(url: string, options?: HttpOptions) {
    return axiosClient.delete<T>(url, { params: options?.params, headers: options?.headers, ...options?.config });
  },
};

export default http;