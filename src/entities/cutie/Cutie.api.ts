import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { dogsApi, foxesApi } from "api";
import { useEffect } from "react";
import { AnimalEnum, type RandomCutie } from "./Cutie.types";
import { preloadImage } from "./Cutie.utils";

export const useRandomCutieQuery = (animal: AnimalEnum) => {
  const query = useQuery<RandomCutie>({
    queryKey: ["cutie", "random", animal],
    queryFn: async ({ signal }) => {
      const image =
        animal === AnimalEnum.DOG
          ? (await dogsApi.getRandomImage(signal)).data.url
          : (await foxesApi.getRandomImage(signal)).data.image;
      const preloaded = await preloadImage(image, signal);
      return { id: image, image, animal, preloaded };
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
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
