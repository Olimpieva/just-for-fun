import { useId } from "react";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "utils/axios";
import { dogApi } from "api";
import { Dog } from "entities/dog";

const fetchDog = createAsyncThunk<
  Dog,
  undefined,
  {
    rejectValue?: string;
  }
>("dogs/fetchDog", async (_, { rejectWithValue }) => {
  try {
    const { data } = await dogApi.getRandomDog();
    const id = useId();

    return { id, image: data.url };
  } catch (e) {
    const { axiosError, error } = handleError(e);
    if (axiosError) {
      return rejectWithValue(axiosError.response?.data.errorMessage);
    }
    return rejectWithValue(error?.message);
  }
});

const likeDog = createAction<Dog>("dogs/likeDog");

export { fetchDog, likeDog };
