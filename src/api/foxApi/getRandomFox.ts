import { FoxApiResponse } from "entities/fox";
import axios from "utils/axios";

const getRandomFox = async () =>
  axios.get<FoxApiResponse>(`random.dog/woof.json`);

export default getRandomFox;
