/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";

import { ApiServiceError } from "@/libs/api";

export type QueryOptions<
  Response,
  TError = ApiServiceError,
  TData = Response
> = UseQueryOptions<Response, TError, TData, any>;

export type MutationOptions<
  Response,
  TError = ApiServiceError,
  TVariables = unknown
> = UseMutationOptions<Response, TError, TVariables, unknown>;
