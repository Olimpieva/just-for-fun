import { useId } from "react";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "utils/axios";
import { foxApi } from "api";
import { Fox } from "entities/fox";

const fetchFox = createAsyncThunk<
  Fox,
  undefined,
  {
    rejectValue?: string;
  }
>("foxes/fetchFox", async (_, { rejectWithValue }) => {
  try {
    const { data } = await foxApi.getRandomFox();
    const id = useId();

    return { id, image: data.image };
  } catch (e) {
    const { axiosError, error } = handleError(e);
    if (axiosError) {
      return rejectWithValue(axiosError.response?.data.errorMessage);
    }
    return rejectWithValue(error?.message);
  }
});

const likeFox = createAction<Fox>("foxes/likeFox");

export { fetchFox, likeFox };
