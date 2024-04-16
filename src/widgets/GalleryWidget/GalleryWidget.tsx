import React, { useCallback, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { useAppSelector, useAppThunkDispatch } from "utils/hooks";
import { ImageLazyLoad, NeumorphismButton } from "components";
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
  const likedImages = useAppSelector(selectLikedImages);
  const { loading } = useAppSelector(selectImageLoading);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Dog);

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
        <NeumorphismButton
          className={cn({ [css.active]: activeTab === Tab.Fox })}
          onClick={toggleActiveTab}
          disabled={activeTab === Tab.Fox || loading}
        >
          <FoxIcon />
        </NeumorphismButton>

        <NeumorphismButton
          className={cn({ [css.active]: activeTab === Tab.Dog })}
          onClick={toggleActiveTab}
          disabled={activeTab === Tab.Dog || loading}
        >
          <DogIcon />
        </NeumorphismButton>
      </div>

      <div className={css.image}>
        <ImageLazyLoad src={current?.image} />

        <div className={css.glitch1}>
          <ImageLazyLoad src={current?.image} />
        </div>
        <div className={css.glitch2}>
          <ImageLazyLoad src={current?.image} />
        </div>
      </div>

      <div className={css.controls}>
        <NeumorphismButton onClick={getNextImage} disabled={loading}>
          <NextIcon />
        </NeumorphismButton>

        <NeumorphismButton
          className={cn(css.like, {
            [css.active]: isLiked,
          })}
          onClick={toggleLike}
          disabled={loading}
        >
          <LikeIcon />
        </NeumorphismButton>
      </div>
    </div>
  );
};

export default GalleryWidget;
