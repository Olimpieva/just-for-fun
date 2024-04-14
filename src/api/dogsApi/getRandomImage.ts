import axios from "utils/axios";

type ResponseType = {
  fileSizeBytes: number;
  url: string;
};

const getRandomImage = async () =>
  axios.get<ResponseType>(`random.dog/woof.json`);

export default getRandomImage;
