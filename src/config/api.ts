export const apiConfig = {
  dogs: {
    baseURL: process.env.REACT_APP_DOGS_API_URL || "https://random.dog",
    endpoints: {
      randomImage: "/woof.json",
    },
  },
  foxes: {
    baseURL: process.env.REACT_APP_FOXES_API_URL || "https://randomfox.ca",
    endpoints: {
      randomImage: "/floof/",
    },
  },
} as const;
