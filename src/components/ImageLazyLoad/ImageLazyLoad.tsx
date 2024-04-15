import React, { useCallback, useEffect, useState } from "react";
import NoImageIcon from "assets/no-image.svg";
import LoadIcon from "assets/load.svg";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholder?: string;
  error?: string;
  className?: string;
}

const ImageLazyLoad = ({
  src,
  placeholder = LoadIcon,
  error = NoImageIcon,
  className,
  ...props
}: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(placeholder || src);

  const onLoad = useCallback(() => {
    setImgSrc(src);
  }, [src]);

  const onError = useCallback(() => {
    setImgSrc(error || placeholder);
  }, [error, placeholder]);

  useEffect(() => {
    const img = new Image();
    img.src = src as string;
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);

    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [src, onLoad, onError]);

  return <img {...props} alt={imgSrc} src={imgSrc} className={className} />;
};

export default ImageLazyLoad;
