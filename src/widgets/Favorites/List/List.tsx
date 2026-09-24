import React from "react";
import { ImageLazyLoad } from "components";
import { useLikedCuties } from "store/favorites";
import { ReactComponent as BrokenHeartIcon } from "assets/broken_heart.svg";
import ImageLoadingIcon from "assets/image-loading-star.png";

import css from "./List.module.scss";

type Props = {
  onDislike: (id: string) => void;
};

const List = ({ onDislike }: Props) => {
  const favorites = useLikedCuties();

  if (Object.keys(favorites).length === 0) {
    return <div className={css.empty}>Здесь пока ничего нет</div>;
  }

  return (
    <>
      {Object.keys(favorites).map(id => {
        const item = favorites[id];
        return (
          <div className={css.image} key={item.id}>
            <div className={css.visual}>
              <ImageLazyLoad
                src={item.image}
                alt={item.id}
                placeholder={ImageLoadingIcon}
              />
            </div>
            <button
              type="button"
              className={css.dislike}
              aria-label="Удалить из избранного"
              onClick={() => onDislike(item.id)}
            >
              <BrokenHeartIcon width={32} height={32} aria-hidden="true" />
              <span className={css.tooltip} aria-hidden="true">
                Удалить
              </span>
            </button>
          </div>
        );
      })}
    </>
  );
};

export default List;
