import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { dogsApi, foxesApi } from "api";
import { useEffect } from "react";
import { AnimalEnum, type Cutie } from "./Cutie.types";

export const useRandomCutieQuery = (animal: AnimalEnum) => {
  const query = useQuery<Cutie>({
    queryKey: ["cutie", "random", animal],
    queryFn: async ({ signal }) => {
      const image =
        animal === AnimalEnum.DOG
          ? (await dogsApi.getRandomImage(signal)).data.url
          : (await foxesApi.getRandomImage(signal)).data.image;
      return { id: uuidv4(), image };
    },
    staleTime: Infinity,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  useEffect(() => {
    if (query.isError) {
      console.error(query.error);
    }
  }, [query.isError, query.error]);

  return query;
};
