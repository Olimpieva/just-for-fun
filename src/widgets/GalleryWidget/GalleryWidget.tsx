import React, { useCallback, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { useAppSelector, useAppThunkDispatch } from "utils/hooks";
import { ImageLazyLoad } from "components";
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
  dislikeImage,
  fetchDogImage,
  fetchFoxImage,
  likeImage,
} from "../../redux/gallery/actions";

import css from "./GalleryWidget.module.scss";

enum Tab {
  Fox = "Fox",
  Dog = "Dog",
}

const GalleryWidget = () => {
  const dispatch = useAppThunkDispatch();
  const current = useAppSelector(selectCurrentImage);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Dog);
  const likedImages = useAppSelector(selectLikedImages);
  const { loading } = useAppSelector(selectImageLoading);

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

  return (
    <div className={css.container}>
      <div className={cn(css.tabs, css.frame)}>
        <button
          className={cn(css.button, {
            [css.active]: activeTab === Tab.Fox,
            [css.disabled]: loading,
          })}
          onClick={toggleActiveTab}
          disabled={activeTab === Tab.Fox || loading}
        >
          <FoxIcon />
        </button>
        <button
          className={cn(css.button, {
            [css.active]: activeTab === Tab.Dog,
            [css.disabled]: loading,
          })}
          onClick={toggleActiveTab}
          disabled={activeTab === Tab.Dog || loading}
        >
          <DogIcon />
        </button>
      </div>

      <div className={css.image}>
        <ImageLazyLoad src={current?.image} />
      </div>

      <div className={css.controls}>
        <button
          className={cn(css.button, {
            [css.disabled]: loading,
          })}
          onClick={getNextImage}
          disabled={loading}
        >
          <NextIcon />
        </button>

        <button
          className={cn(css.button, css.like, {
            [css.active]: isLiked,
          })}
          onClick={toggleLike}
          disabled={loading}
        >
          <LikeIcon />
        </button>
      </div>
    </div>
  );
};

export default GalleryWidget;
