import { useState } from "react";
import cn from "classnames";
import { useLikedCuties } from "store/favorites";
import BrokenHeartIcon from "assets/broken_heart.svg?react";
import NoImageIcon from "assets/no-image-floppy.png";

import css from "./List.module.scss";

type Props = {
  onDislike: (id: string) => void;
};

const List = ({ onDislike }: Props) => {
  const favorites = useLikedCuties();
  const [failedIds, setFailedIds] = useState<ReadonlySet<string>>(new Set());

  if (Object.keys(favorites).length === 0) {
    return <div className={css.empty}>Здесь пока ничего нет</div>;
  }

  return (
    <>
      {Object.keys(favorites).map(id => {
        const item = favorites[id];
        const isFailed = failedIds.has(item.id);
        return (
          <div className={css.image} key={item.id}>
            <div className={css.visual}>
              <img
                className={cn({ [css.failed]: isFailed })}
                src={isFailed ? NoImageIcon : item.image}
                alt="Фото из избранного"
                loading="lazy"
                decoding="async"
                onError={() => setFailedIds(ids => new Set(ids).add(item.id))}
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
