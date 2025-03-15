import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

import { API_URL, API_ACCESS_TOKEN } from "@/constants/Config";

export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (API_ACCESS_TOKEN && config.headers) {
      config.headers.Authorization = `Bearer ${API_ACCESS_TOKEN}`;
    }

    return config;
  },
  async (error: AxiosError) => {
    return await Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response.data;
  },
  async (error: AxiosError) => {
    return await Promise.reject(error);
  }
);
