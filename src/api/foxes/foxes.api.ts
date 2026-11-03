import { apiConfig } from "../api.config";
import { httpClient } from "../httpClient";
import type { IRandomFoxResponse } from "./foxes.types";

export const getRandom = async (signal?: AbortSignal) =>
  httpClient.get<IRandomFoxResponse>(apiConfig.foxes.endpoints.randomImage, {
    baseURL: apiConfig.foxes.baseURL,
    signal,
  });
