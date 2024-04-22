import React, { useCallback, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { useAppSelector, useAppThunkDispatch } from "utils/hooks";
import { ImageLazyLoad, NeumorphiсButton } from "components";
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

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      dispatch(clearCurrentImage());
    };
  }, [dispatch]);

  return (
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
          <NeumorphiсButton
            className={cn({ [css.active]: activeTab === Tab.Fox })}
            onClick={toggleActiveTab}
            disabled={activeTab === Tab.Fox || loading || !isImageLoaded}
          >
            <FoxIcon />
          </NeumorphiсButton>

          <NeumorphiсButton
            className={cn({ [css.active]: activeTab === Tab.Dog })}
            onClick={toggleActiveTab}
            disabled={activeTab === Tab.Dog || loading || !isImageLoaded}
          >
            <DogIcon />
          </NeumorphiсButton>
        </div>

        <div className={css.controls}>
          <NeumorphiсButton
            onClick={getNextImage}
            disabled={loading || !isImageLoaded}
          >
            <NextIcon />
          </NeumorphiсButton>

          <NeumorphiсButton
            className={cn(css.like, {
              [css.active]: isLiked,
              [css.liked]: isLiked,
            })}
            onClick={toggleLike}
            disabled={loading || !isImageLoaded}
          >
            <LikeIcon />
          </NeumorphiсButton>
        </div>
      </div>
    </div>
  );
};

export default GalleryWidget;
