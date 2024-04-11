import { Dog } from "entities/dog";

export type InitialState = {
  current: null | Dog;
  liked: Record<string, Dog>;
  loading: boolean;
  loaded: boolean;
};
