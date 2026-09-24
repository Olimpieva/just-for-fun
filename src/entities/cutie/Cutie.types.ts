export enum AnimalEnum {
  FOX = "Fox",
  DOG = "Dog",
}

export type Animal = (typeof AnimalEnum)[keyof typeof AnimalEnum];

export type Cutie = {
  id: string;
  image: string;
};
