import { useRandomCutieQuery, type AnimalEnum } from "entities/cutie";

export const useNextCutie = (animal: AnimalEnum) => {
  const {
    data: cutie,
    isFetching: isLoading,
    isError,
    isPaused,
    refetch,
  } = useRandomCutieQuery(animal);

  const getNext = () => {
    refetch();
  };

  return { cutie, isLoading, isError, isPaused, getNext };
};
