import Axios, { AxiosResponse } from "axios";
import applyCaseMiddleware from "axios-case-converter";

const axios = applyCaseMiddleware(
  Axios.create({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    responseType: "json",
    baseURL: "https://",
  }),
  {
    ignoreHeaders: true,
  },
);

export type Response<T> = AxiosResponse<T>;
export default axios;
