import axios from "utils/axios";
import { apiConfig } from "config/api";

type ResponseType = {
  fileSizeBytes: number;
  url: string;
};

const getRandomImage = async (signal?: AbortSignal) =>
  axios.get<ResponseType>(apiConfig.dogs.endpoints.randomImage, {
    baseURL: apiConfig.dogs.baseURL,
    signal,
  });

export default getRandomImage;
