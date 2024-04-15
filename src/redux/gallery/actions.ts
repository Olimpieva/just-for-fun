import { v4 as uuidv4 } from "uuid";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
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

const likeImage = createAction<GalleryItem>("gallery/likeImage");

const dislikeImage = createAction<string>("gallery/dislikeImage");

export { fetchFoxImage, fetchDogImage, likeImage, dislikeImage };
