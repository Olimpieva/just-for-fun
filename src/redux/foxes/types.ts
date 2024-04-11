import { Fox } from "entities/fox";

export type InitialState = {
  current: null | Fox;
  liked: Record<string, Fox>;
  loading: boolean;
  loaded: boolean;
};
