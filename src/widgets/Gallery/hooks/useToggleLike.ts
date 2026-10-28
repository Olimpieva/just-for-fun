import type { Cutie } from "entities/cutie";
import { useDislikeCutie, useLikeCutie, useLikedCuties } from "store/favorites";

export const useToggleLike = (cutie: Cutie | undefined) => {
  const likedCuties = useLikedCuties();
  const likeCutie = useLikeCutie();
  const dislikeCutie = useDislikeCutie();

  const isLiked = Boolean(cutie && likedCuties[cutie.id]);

  const toggleLike = () => {
    if (!cutie) return;

    if (isLiked) {
      dislikeCutie(cutie.id);
      return;
    }

    likeCutie(cutie);
  };

  return { isLiked, toggleLike };
};
