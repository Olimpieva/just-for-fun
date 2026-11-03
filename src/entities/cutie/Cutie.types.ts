export enum AnimalEnum {
  FOX = "Fox",
  DOG = "Dog",
}

export type Cutie = {
  id: string;
  image: string;
};

export type RandomCutie = Cutie & {
  animal: AnimalEnum;
  preloaded: HTMLImageElement;
};
