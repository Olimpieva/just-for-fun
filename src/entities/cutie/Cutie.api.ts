import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { dogsApi, foxesApi } from "api";
import { preloadImage } from "shared/helpers";

import { AnimalEnum, type IRandomCutie } from "./Cutie.types";

const VIDEO_EXTENSIONS = ["mp4", "webm"];

export const useRandomCutieQuery = (animal: AnimalEnum) => {
  const query = useQuery<IRandomCutie>({
    queryKey: ["cutie", "random", animal],
    queryFn: async ({ signal }) => {
      const image =
        animal === AnimalEnum.DOG
          ? (await dogsApi.getRandom({ filter: VIDEO_EXTENSIONS.join(","), signal })).data.url
          : (await foxesApi.getRandom(signal)).data.image;
      const extension = new URL(image).pathname.split(".").at(-1)?.toLowerCase();
      if (VIDEO_EXTENSIONS.includes(extension ?? "")) {
        throw new Error("Expected an image but received a video");
      }
      await preloadImage(image, signal);
      return { id: image, image, animal };
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
