import cn from "classnames";

import BrokenHeartIcon from "assets/ui/broken_heart.svg?react";
import NoImageIcon from "assets/ui/no-image-floppy.png";
import { useLikedCuties } from "store/favorites";

import { useFailedImages } from "../../hooks";

import css from "./List.module.scss";

type Props = {
  onDislike: (id: string) => void;
};

export const List = ({ onDislike }: Props) => {
  const favorites = useLikedCuties();
  const { isFailed, markFailed } = useFailedImages();

  if (Object.keys(favorites).length === 0) {
    return <div className={css.empty}>Здесь пока ничего нет</div>;
  }

  return (
    <>
      {Object.keys(favorites).map(id => {
        const item = favorites[id];
        const isImageFailed = isFailed(item.id);
        return (
          <div className={css.image} key={item.id}>
            <div className={css.visual}>
              <img
                className={cn({ [css.failed]: isImageFailed })}
                src={isImageFailed ? NoImageIcon : item.image}
                alt="Фото из избранного"
                loading="lazy"
                decoding="async"
                onError={() => markFailed(item.id)}
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
