import { DogApiResponse } from "entities/dog";
import axios from "utils/axios";

const getRandomDog = async () =>
  axios.get<DogApiResponse>(`random.dog/woof.json`);

export default getRandomDog;
