import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

export const getBreeds = createAsyncThunk<any[]>('breeds/getBreeds', async () => {
  return await fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key': 'e63e7ebf-7753-40d2-9aed-22354cab9561'
    }
  }).then((res) => res.json());
});

export const getNewPhoto = createAsyncThunk<any, string>('breeds/getNewPhoto', async (breedId) => {
  return await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
    headers: {
      'x-api-key': 'e63e7ebf-7753-40d2-9aed-22354cab9561'
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
  extraReducers: {
    // @ts-ignore
    [getBreeds.pending]: (state) => {
      state.status = Statuses.LOADING;
    },
    // @ts-ignore
    [getBreeds.fulfilled]: (state, action) => {
      state.status = Statuses.SUCCESS;
      state.allBreeds = action.payload;
    },
    // @ts-ignore
    [getBreeds.rejected]: (state) => {
      state.status = Statuses.FAILED;
    },
    // @ts-ignore
    [getNewPhoto.pending]: (state) => {
      state.status = Statuses.LOADING;
    },
    // @ts-ignore
    [getNewPhoto.fulfilled]: (state, action) => {
      state.status = Statuses.SUCCESS;
      state.allBreeds = state.allBreeds.map((el: any) => {
        if (el.id === action.payload[0]?.breeds[0]?.id) {
          return { ...el, image: { ...el.image, url: action.payload[0]?.url } };
        }

        return el;
      });
    },
    // @ts-ignore
    [getNewPhoto.rejected]: (state) => {
      state.status = Statuses.FAILED;
    }
  }
});

export const { increment, decrement } = breedSlice.actions;

export default breedSlice.reducer;
