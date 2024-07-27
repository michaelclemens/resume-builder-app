"use client"

import { getPersonal } from '@/lib/client/personal';
import { Personal } from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

const initialState: { personal: Personal|null, loading: boolean, error: null|string  } = {
  personal: null,
  loading: true,
  error: null,
}

export const fetchPersonal = createAsyncThunk<Personal|null, string, { rejectValue: string }>('resume/personal/fetch', async(resumeId: string, { rejectWithValue }) => {
    try {
      return await getPersonal(resumeId);
    } catch (err) {
      const error: Error = err as any;
      rejectWithValue(error.message);
      return null;
    }
});

export const slice = createSlice({
  name: 'personal',
  initialState,
  reducers: {
    setPersonal: (state, action) => {
      state.personal = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonal.pending, (state) => {
        state.loading = true;
        state.personal = null;
        state.error = null;
      })
      .addCase(fetchPersonal.fulfilled, (state, action) => {
        state.personal = action.payload ?? null;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchPersonal.rejected, (state, action) => {
        state.personal = null;       
        state.error = action.payload ?? null;
        state.loading = false;
      })
  }
})

export const { setPersonal, clear } = slice.actions;

export const selectPersonal = (state: RootState) => state.personal;
export const selectPersonalDetails = (state: RootState) => state.personal.personal;
export const selectPersonalLoading = (state: RootState) => state.personal.loading;

export default slice.reducer