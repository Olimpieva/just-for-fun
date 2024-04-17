import React, { useCallback, useEffect, useState } from "react";
import NoImageIcon from "assets/no-image.svg";
import LoadIcon from "assets/load.svg";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholder?: string;
  error?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const ImageLazyLoad = ({
  src,
  onLoad,
  onError,
  placeholder = LoadIcon,
  error = NoImageIcon,
  className,
  ...props
}: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(placeholder || src);

  const onLoadhandler = useCallback(() => {
    if (onLoad) onLoad();
    setImgSrc(src);
  }, [onLoad, src]);

  const onErrorHandler = useCallback(() => {
    if (onError) onError();
    setImgSrc(error || placeholder);
  }, [error, onError, placeholder]);

  useEffect(() => {
    const img = new Image();
    img.src = src as string;
    img.addEventListener("load", onLoadhandler);
    img.addEventListener("error", onErrorHandler);

    return () => {
      img.removeEventListener("load", onLoadhandler);
      img.removeEventListener("error", onErrorHandler);
    };
  }, [src, onLoadhandler, onErrorHandler]);

  return <img {...props} alt={imgSrc} src={imgSrc} className={className} />;
};

export default ImageLazyLoad;
