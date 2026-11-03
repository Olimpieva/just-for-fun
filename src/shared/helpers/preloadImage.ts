export const preloadImage = (src: string, signal: AbortSignal) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    const abort = () => {
      image.src = "";
      reject(signal.reason);
    };
    signal.addEventListener("abort", abort, { once: true });
    image.onload = () => {
      image
        .decode()
        .then(() => resolve(image), reject)
        .finally(() => signal.removeEventListener("abort", abort));
    };
    image.onerror = () => {
      signal.removeEventListener("abort", abort);
      reject(new Error(`Failed to load image: ${src}`));
    };
    image.src = src;
  });
