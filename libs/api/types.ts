/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosError, InternalAxiosRequestConfig } from "axios";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}

export type ApiResponse<Response, Default = Record<string, never>> =
  | Response
  | Default;

export type ApiServiceError<T = unknown, D = any> = AxiosError<T, D>;

export type PaginationResponse<T> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
};
