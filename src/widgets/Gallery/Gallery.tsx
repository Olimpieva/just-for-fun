import React, { useCallback, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { useAppSelector, useAppThunkDispatch } from "utils/hooks";
import {
  Card,
  GlitchedTitle,
  ImageLazyLoad,
  NeumorphicButton,
} from "components";
import { ReactComponent as LikeIcon } from "assets/like.svg";
import { ReactComponent as DogIcon } from "assets/dog.svg";
import { ReactComponent as FoxIcon } from "assets/fox.svg";
import { ReactComponent as NextIcon } from "assets/next.svg";
import {
  selectCurrentImage,
  selectImageLoading,
  selectLikedImages,
} from "../../redux/gallery/selectors";
import {
  clearCurrentImage,
  dislikeImage,
  fetchDogImage,
  fetchFoxImage,
  likeImage,
} from "../../redux/gallery/actions";

import css from "./Gallery.module.scss";

enum Tab {
  Fox = "Fox",
  Dog = "Dog",
}

const GalleryWidget = () => {
  const dispatch = useAppThunkDispatch();
  const current = useAppSelector(selectCurrentImage);
  const likedImages = useAppSelector(selectLikedImages);
  const { loading } = useAppSelector(selectImageLoading);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Dog);
  // I don't need lazy load here, I guess?
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [current]);

  const onLoadImage = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  const isLiked = useMemo(
    () => current && Boolean(likedImages[current.id]),
    [current, likedImages],
  );

  const getDogImage = useCallback(() => {
    dispatch(fetchDogImage());
  }, [dispatch]);

  const getFoxImage = useCallback(() => {
    dispatch(fetchFoxImage());
  }, [dispatch]);

  const toggleActiveTab = () => {
    setActiveTab(prev => (prev === Tab.Dog ? Tab.Fox : Tab.Dog));
  };

  const getNextImage = () => {
    if (activeTab === Tab.Dog) {
      getDogImage();
      return;
    }

    getFoxImage();
  };

  const toggleLike = () => {
    if (!current) return;

    if (isLiked) {
      dispatch(dislikeImage(current.id));
      return;
    }

    dispatch(likeImage(current));
  };

  useEffect(() => {
    if (activeTab === Tab.Dog) {
      getDogImage();
    } else {
      getFoxImage();
    }
  }, [activeTab, getDogImage, getFoxImage]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentImage());
    };
  }, [dispatch]);

  return (
    <Card
      title={
        <div className={css.wrapper}>
          <GlitchedTitle.Pixel title="Инстаграм здорового человека" />
        </div>
      }
    >
      <div className={css.container}>
        <div className={css.left}>
          <ImageLazyLoad
            onLoad={onLoadImage}
            onError={onLoadImage}
            src={current?.image}
          />

          <div className={css.glitch1}>
            <ImageLazyLoad src={current?.image} />
          </div>
          <div className={css.glitch2}>
            <ImageLazyLoad src={current?.image} />
          </div>
        </div>

        <div className={css.right}>
          <div className={css.tabs}>
            <NeumorphicButton
              className={cn({
                [css.disabled]:
                  activeTab === Tab.Fox || loading || !isImageLoaded,
              })}
              onClick={toggleActiveTab}
              disabled={activeTab === Tab.Fox || loading || !isImageLoaded}
            >
              <FoxIcon />
            </NeumorphicButton>

            <NeumorphicButton
              className={cn({
                [css.disabled]:
                  activeTab === Tab.Dog || loading || !isImageLoaded,
              })}
              onClick={toggleActiveTab}
              disabled={activeTab === Tab.Dog || loading || !isImageLoaded}
            >
              <DogIcon />
            </NeumorphicButton>
          </div>

          <div className={css.controls}>
            <NeumorphicButton
              onClick={getNextImage}
              disabled={loading || !isImageLoaded}
              className={cn({ [css.disabled]: loading || !isImageLoaded })}
            >
              <NextIcon />
            </NeumorphicButton>

            <NeumorphicButton
              className={cn(css.like, {
                [css.active]: isLiked,
                [css.liked]: isLiked,
                [css.disabled]: loading || !isImageLoaded,
              })}
              onClick={toggleLike}
              disabled={loading || !isImageLoaded}
            >
              <LikeIcon />
            </NeumorphicButton>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GalleryWidget;
