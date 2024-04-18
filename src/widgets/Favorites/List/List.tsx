import React from "react";
import { ImageLazyLoad } from "components";
import { useAppSelector } from "utils/hooks";
import { ReactComponent as BrokenHeartIcon } from "assets/broken_heart.svg";
import { selectLikedImages } from "../../../redux/gallery/selectors";

import css from "./List.module.scss";

type Props = {
  onDislike: (id: string) => void;
};

const List = ({ onDislike }: Props) => {
  const favorites = useAppSelector(selectLikedImages);

  if (Object.keys(favorites).length === 0) {
    return <div className={css.empty}>Ничего нет. :(</div>;
  }

  return (
    <>
      {Object.keys(favorites).map(id => {
        const item = favorites[id];
        return (
          <div className={css.image} key={item.id}>
            <ImageLazyLoad src={item.image} alt={item.id} />
            <button className={css.dislike} onClick={() => onDislike(item.id)}>
              <BrokenHeartIcon width={64} />
            </button>
          </div>
        );
      })}
    </>
  );
};

export default List;
