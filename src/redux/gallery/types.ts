import { Dog } from "entities/dog";
import { Fox } from "entities/fox";

export type InitialState = {
  current: null | Dog | Fox;
  liked: Record<string, Dog | Fox>;
  loading: boolean;
  loaded: boolean;
};
