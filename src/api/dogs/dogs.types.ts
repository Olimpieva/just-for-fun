export interface IRandomDogResponse {
  fileSizeBytes: number;
  url: string;
}

export interface IRandomDogOptions {
  filter?: string;
  signal?: AbortSignal;
}
