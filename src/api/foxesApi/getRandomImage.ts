import axios from "utils/axios";
import { apiConfig } from "config/api";

type ResponseType = {
  image: string;
  link: string;
};

const getRandomImage = async (signal?: AbortSignal) =>
  axios.get<ResponseType>(apiConfig.foxes.endpoints.randomImage, {
    baseURL: apiConfig.foxes.baseURL,
    signal,
  });

export default getRandomImage;
