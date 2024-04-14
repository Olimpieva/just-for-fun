import React, { useCallback, useEffect } from "react";
import cn from "classnames";
import { useAppSelector, useAppThunkDispatch } from "utils/hooks";
import { Card, RainbowTitle } from "components";
import { ReactComponent as FoxIcon } from "assets/fox.svg";
import { ReactComponent as DogIcon } from "assets/dog.svg";
import { selectCurrentImage } from "../../redux/gallery/selectors";
import { fetchDogImage, fetchFoxImage } from "../../redux/gallery/actions";

import css from "./MemesWidget.module.scss";

const MemesWidget = () => {
  const dispatch = useAppThunkDispatch();
  const current = useAppSelector(selectCurrentImage);

  const getDogImage = useCallback(() => {
    dispatch(fetchDogImage());
  }, [dispatch]);

  const getFoxImage = useCallback(() => dispatch(fetchFoxImage()), [dispatch]);

  useEffect(() => {
    getDogImage();
  }, [dispatch, getDogImage]);

  return (
    <Card title="Галерея">
      <div className={css.container}>
        <button className={cn(css.button, css.top)} onClick={getFoxImage}>
          <RainbowTitle
            title="Покажи лису"
            icon={<FoxIcon color="#f3a14b" width="96px" />}
          />
        </button>

        <button className={cn(css.button, css.bottom)} onClick={getDogImage}>
          <RainbowTitle
            title="Покажи пса"
            icon={<DogIcon color="#61b4de" width="96px" />}
          />
        </button>

        <img src={current?.image} className={css.image} />
      </div>
    </Card>
  );
};

export default MemesWidget;
