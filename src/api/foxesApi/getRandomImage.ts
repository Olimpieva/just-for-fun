import axios from "utils/axios";

type ResponseType = {
  image: string;
  link: string;
};

const getRandomImage = async () =>
  axios.get<ResponseType>(`https://randomfox.ca/floof/`);

export default getRandomImage;
