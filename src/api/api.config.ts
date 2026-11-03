export const apiConfig = {
  dogs: {
    baseURL: import.meta.env.VITE_DOGS_API_URL || "https://random.dog",
    endpoints: {
      randomImage: "/woof.json",
    },
  },
  foxes: {
    baseURL: import.meta.env.VITE_FOXES_API_URL || "https://randomfox.ca",
    endpoints: {
      randomImage: "/floof/",
    },
  },
} as const;
