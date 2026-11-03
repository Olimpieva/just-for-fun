import { apiConfig } from "../api.config";
import { httpClient } from "../httpClient";
import type { IRandomDogOptions, IRandomDogResponse } from "./dogs.types";

export const getRandom = async ({ filter, signal }: IRandomDogOptions = {}) =>
  httpClient.get<IRandomDogResponse>(apiConfig.dogs.endpoints.randomImage, {
    baseURL: apiConfig.dogs.baseURL,
    params: { filter },
    signal,
  });
