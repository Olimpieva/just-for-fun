import axios from "utils/axios";

type ResponseType = {
  image: string;
  link: string;
};

const getRandomImage = async () =>
  axios.get<ResponseType>(`randomfox.ca/floof/`);

export default getRandomImage;
