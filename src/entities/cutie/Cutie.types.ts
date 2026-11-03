export enum AnimalEnum {
  FOX = "Fox",
  DOG = "Dog",
}

export interface ICutie {
  id: string;
  image: string;
}

export interface IRandomCutie extends ICutie {
  animal: AnimalEnum;
}
