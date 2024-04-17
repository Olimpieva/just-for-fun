import { useEffect } from "react";
import { useAppThunkDispatch } from "./redux";
import { updateLikedImages } from "../../redux/gallery/actions";

const useLocalStorageListening = () => {
  const dispatch = useAppThunkDispatch();

  useEffect(() => {
    const setDataToStore = (event: StorageEvent) => {
      const { newValue, key } = event;

      if (key === `liked`) {
        dispatch(updateLikedImages(JSON.parse(newValue || "{}")));
      }
    };

    window.addEventListener("storage", setDataToStore);

    return () => {
      window.removeEventListener("storage", setDataToStore);
    };
  }, [dispatch]);
};

export default useLocalStorageListening;
