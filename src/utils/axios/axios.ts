import Axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const axios = applyCaseMiddleware(
  Axios.create({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    responseType: "json",
  }),
  {
    ignoreHeaders: true,
  },
);

export default axios;
