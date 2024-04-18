import { v4 as uuidv4 } from "uuid";
import {
  PrepareAction,
  createAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { handleError } from "utils/axios";
import { dogsApi, foxesApi } from "api";
import { GalleryItem } from "entities/galleryItem";

const fetchDogImage = createAsyncThunk<
  GalleryItem,
  undefined,
  {
    rejectValue?: string;
  }
>("gallery/fetchDogImage", async (_, { rejectWithValue }) => {
  try {
    const { data } = await dogsApi.getRandomImage();
    const id = uuidv4();

    return { id, image: data.url };
  } catch (e) {
    const { axiosError, error } = handleError(e);
    if (axiosError) {
      return rejectWithValue(axiosError.response?.data.errorMessage);
    }
    return rejectWithValue(error?.message);
  }
});

const fetchFoxImage = createAsyncThunk<
  GalleryItem,
  undefined,
  {
    rejectValue?: string;
  }
>("gallery/fetchFoxImage", async (_, { rejectWithValue }) => {
  try {
    const { data } = await foxesApi.getRandomImage();
    const id = uuidv4();

    return { id, image: data.image };
  } catch (e) {
    const { axiosError, error } = handleError(e);
    if (axiosError) {
      return rejectWithValue(axiosError.response?.data.errorMessage);
    }
    return rejectWithValue(error?.message);
  }
});

const updateLikedImages = createAction<Record<string, GalleryItem>>(
  "gallery/updateLikedImages",
);

const fetchLikedImages = createAsyncThunk<
  void,
  undefined,
  {
    rejectValue?: string;
  }
>("gallery/fetchLikedImages", async (_, { rejectWithValue, dispatch }) => {
  try {
    const liked = JSON.parse(localStorage.getItem("liked") || "{}");

    await dispatch(updateLikedImages(liked));

    return undefined;
  } catch (e) {
    const { axiosError, error } = handleError(e);
    if (axiosError) {
      return rejectWithValue(axiosError.response?.data.errorMessage);
    }
    return rejectWithValue(error?.message);
  }
});

const likeImage = createAction<PrepareAction<GalleryItem>>(
  "gallery/likeImage",
  (newImage: GalleryItem) => {
    const prevLiked = JSON.parse(localStorage.getItem("liked") || "{}");
    const newLiked = { ...prevLiked, [newImage.id]: newImage };
    localStorage.setItem("liked", JSON.stringify(newLiked));

    return { payload: newImage };
  },
);

const dislikeImage = createAction<PrepareAction<string>>(
  "gallery/dislikeImage",
  (id: string) => {
    const prevLiked = JSON.parse(localStorage.getItem("liked") || "{}");
    prevLiked[id] = undefined;
    const newLiked = { ...prevLiked };
    localStorage.setItem("liked", JSON.stringify(newLiked));

    return { payload: id };
  },
);

const clearCurrentImage = createAction<undefined>("gallery/clearCurrentImage");

export {
  fetchFoxImage,
  fetchDogImage,
  likeImage,
  dislikeImage,
  clearCurrentImage,
  updateLikedImages,
  fetchLikedImages,
};
