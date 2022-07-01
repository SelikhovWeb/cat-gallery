import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CAT_API_HEADER, CAT_API_KEY } from '../../constants/API';

export const getBreeds = createAsyncThunk<any[]>('breeds/getBreeds', async () => {
  return await fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      [CAT_API_HEADER]: CAT_API_KEY
    }
  }).then((res) => res.json());
});

export const getNewPhoto = createAsyncThunk<any, string>('breeds/getNewPhoto', async (breedId) => {
  return await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
    headers: {
      [CAT_API_HEADER]: CAT_API_KEY
    }
  }).then((res) => res.json());
});

export enum Statuses {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILED = 'failed'
}
export interface CatBreedsInterface {
  allBreeds: any[];
  status: null | Statuses;
  index: number;
}

const initialState: CatBreedsInterface = {
  allBreeds: [],
  status: null,
  index: 0
};

const breedSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    increment: (state) => {
      state.index += 1;
    },
    decrement: (state) => {
      state.index -= 1;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getBreeds.pending, (state) => {
      state.status = Statuses.LOADING;
    });
    builder.addCase(getBreeds.fulfilled, (state, action) => {
      state.status = Statuses.SUCCESS;
      state.allBreeds = action.payload;
    });
    builder.addCase(getBreeds.rejected, (state) => {
      state.status = Statuses.FAILED;
    });
    builder.addCase(getNewPhoto.pending, (state) => {
      state.status = Statuses.LOADING;
    });
    builder.addCase(getNewPhoto.fulfilled, (state, action) => {
      state.status = Statuses.SUCCESS;
      state.allBreeds = state.allBreeds.map((el: any) => {
        if (el.id === action.payload[0]?.breeds[0]?.id) {
          return { ...el, image: { ...el.image, url: action.payload[0]?.url } };
        }
        return el;
      });
    });
    builder.addCase(getNewPhoto.rejected, (state) => {
      state.status = Statuses.FAILED;
    });
  }
});

export const { increment, decrement } = breedSlice.actions;

export default breedSlice.reducer;
