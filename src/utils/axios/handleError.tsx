import { AxiosError } from 'axios';

type DefaultResponseError<T extends {}> = T & {
  errorCode?: number;
  errorMessage?: string;
};

type ReturnType<T extends {}> = {
  axiosError?: AxiosError<DefaultResponseError<T>>;
  error?: Error;
};

const handleError = <T extends {}>(error: unknown): ReturnType<T> => {
  const err = error as AxiosError<T>;
  if (err?.isAxiosError) {
    return {
      axiosError: err as AxiosError<T>
    };
  }

  return {
    error: err as Error
  };
};

export default handleError;
