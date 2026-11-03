import DachshundIcon from "assets/ui/dachshund.svg?react";
import FoxIcon from "assets/ui/fox.svg?react";
import LikeIcon from "assets/ui/like.svg?react";
import NextIcon from "assets/ui/next.svg?react";
import { AnimalEnum } from "entities/cutie";
import { Card, ErrorMessage, GlitchedTitle, Loader, PixelButton } from "shared/ui";

import { useActiveTab, useNextCutie, useToggleLike } from "./hooks";

import css from "./Gallery.module.scss";

export const Gallery = () => {
  const [activeTab, setActiveTab] = useActiveTab();

  const { cutie: displayed, isLoading, isError, isPaused, getNext } = useNextCutie(activeTab);

  const { isLiked, toggleLike } = useToggleLike(displayed);

  return (
    <Card
      title={
        <div className={css.wrapper}>
          <GlitchedTitle.Pixel title="Галерея" />
        </div>
      }
    >
      <div className={css.container}>
        {["topLeft", "topRight", "bottomLeft", "bottomRight"].map(corner => (
          <span key={corner} className={`${css.cornerDot} ${css[corner]}`} aria-hidden="true" />
        ))}

        <div className={css.left} aria-busy={isLoading}>
          {displayed && (
            <img
              src={displayed.image}
              alt={displayed.animal === AnimalEnum.FOX ? "Случайная лисичка" : "Случайная собачка"}
            />
          )}

          {isLoading && <Loader className={css.loader} label="Загрузка изображения" />}
        </div>

        <div className={css.right}>
          <div className={css.tabs} role="group" aria-label="Категория фотографий">
            <PixelButton
              className={css.category}
              aria-pressed={activeTab === AnimalEnum.FOX}
              onClick={() => setActiveTab(AnimalEnum.FOX)}
              disabled={isLoading}
            >
              <FoxIcon className={css.fox} aria-hidden="true" />
              <span>лисы</span>
            </PixelButton>

            <PixelButton
              className={css.category}
              aria-pressed={activeTab === AnimalEnum.DOG}
              onClick={() => setActiveTab(AnimalEnum.DOG)}
              disabled={isLoading}
            >
              <DachshundIcon className={css.dachshund} aria-hidden="true" />
              <span>собаки</span>
            </PixelButton>
          </div>

          {isError && (
            <ErrorMessage>Не удалось загрузить изображение. Попробуйте ещё раз.</ErrorMessage>
          )}

          {isPaused && <ErrorMessage>Нет подключения к интернету. Попробуйте позже.</ErrorMessage>}

          <div className={css.controls}>
            <PixelButton onClick={getNext} disabled={isLoading}>
              <NextIcon aria-hidden="true" />
              <span>дальше</span>
            </PixelButton>

            <PixelButton
              aria-label={isLiked ? "В избранном" : "В избранное"}
              aria-pressed={Boolean(isLiked)}
              onClick={toggleLike}
              disabled={!displayed || isLoading}
            >
              <LikeIcon aria-hidden="true" />
              <span>{isLiked ? "в избранном" : "в избранное"}</span>
            </PixelButton>
          </div>
        </div>
      </div>
    </Card>
  );
};
