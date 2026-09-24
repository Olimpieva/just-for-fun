import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDislikeCutie, useLikeCutie, useLikedCuties } from "store/favorites";
import { Card, GlitchedTitle, ImageLazyLoad } from "components";
import PixelButton from "components/PixelButton/PixelButton";
import { ReactComponent as LikeIcon } from "assets/like.svg";
import { ReactComponent as DogIcon } from "assets/dog.svg";
import { ReactComponent as FoxIcon } from "assets/fox.svg";
import { ReactComponent as NextIcon } from "assets/next.svg";
import ImageLoadingIcon from "assets/image-loading-star.png";

import { AnimalEnum, useRandomCutieQuery } from "entities/cutie";

import css from "./Gallery.module.scss";

const GalleryWidget = () => {
  const [activeTab, setActiveTab] = useState<AnimalEnum>(AnimalEnum.FOX);
  const {
    data: current,
    isFetching: loading,
    isError,
    isPaused,
    refetch,
  } = useRandomCutieQuery(activeTab);

  const likedImages = useLikedCuties();
  const likeImage = useLikeCutie();
  const dislikeImage = useDislikeCutie();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loadedImageSrc, setLoadedImageSrc] = useState<string>();

  useEffect(() => {
    setIsImageLoaded(false);
    setLoadedImageSrc(undefined);
  }, [current]);

  const onLoadImage = useCallback(() => {
    setIsImageLoaded(true);
    setLoadedImageSrc(current?.image);
  }, [current?.image]);

  const onImageError = useCallback(() => {
    setIsImageLoaded(true);
    setLoadedImageSrc(undefined);
  }, []);

  const canShowImageEffect = Boolean(
    !loading && loadedImageSrc && loadedImageSrc === current?.image,
  );

  const isLiked = useMemo(
    () => current && Boolean(likedImages[current.id]),
    [current, likedImages],
  );

  const getNextImage = () => {
    refetch();
  };

  const toggleLike = () => {
    if (!current) return;

    if (isLiked) {
      dislikeImage(current.id);
      return;
    }

    likeImage(current);
  };

  return (
    <Card
      title={
        <div className={css.wrapper}>
          <GlitchedTitle.Pixel title="Галерея" />
        </div>
      }
    >
      <div className={css.container}>
        <div className={css.left}>
          {loading ? (
            <img src={ImageLoadingIcon} alt="Загрузка изображения" />
          ) : (
            <ImageLazyLoad
              key={current?.image}
              placeholder={ImageLoadingIcon}
              onLoad={onLoadImage}
              onError={onImageError}
              src={current?.image}
            />
          )}

          {canShowImageEffect && (
            <>
              <div className={css.glitch1} aria-hidden="true">
                <img src={loadedImageSrc} alt="" />
              </div>
              <div className={css.glitch2} aria-hidden="true">
                <img src={loadedImageSrc} alt="" />
              </div>
            </>
          )}
        </div>

        <div className={css.right}>
          <div
            className={css.tabs}
            role="group"
            aria-label="Категория фотографий"
          >
            <PixelButton
              className={css.category}
              aria-pressed={activeTab === AnimalEnum.FOX}
              onClick={() => setActiveTab(AnimalEnum.FOX)}
              disabled={loading || (!isImageLoaded && !isError && !isPaused)}
            >
              <FoxIcon aria-hidden="true" />
              <span>Лисы</span>
            </PixelButton>
            <PixelButton
              className={css.category}
              aria-pressed={activeTab === AnimalEnum.DOG}
              onClick={() => setActiveTab(AnimalEnum.DOG)}
              disabled={loading || (!isImageLoaded && !isError && !isPaused)}
            >
              <DogIcon aria-hidden="true" />
              <span>Собаки</span>
            </PixelButton>
          </div>

          {isError && (
            <p role="alert">
              Не удалось загрузить изображение. Нажми «Дальше», чтобы повторить.
            </p>
          )}
          {isPaused && (
            <p role="status">
              Нет подключения к интернету. Ждём восстановления связи.
            </p>
          )}
          <div className={css.controls}>
            <PixelButton
              onClick={getNextImage}
              disabled={loading || (!isImageLoaded && !isError && !isPaused)}
            >
              <NextIcon aria-hidden="true" />
              <span>Дальше</span>
            </PixelButton>
            <PixelButton
              aria-label="В избранное"
              aria-pressed={Boolean(isLiked)}
              onClick={toggleLike}
              disabled={!current || loading || !isImageLoaded}
            >
              <LikeIcon aria-hidden="true" />
              <span>В избранное</span>
            </PixelButton>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GalleryWidget;
