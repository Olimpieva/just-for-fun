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
  // Keeps the decoded image in browser memory while the query is cached,
  // so a remounted <img> shows it without revalidating (random.dog sends max-age=0).
  preloaded: HTMLImageElement;
};
