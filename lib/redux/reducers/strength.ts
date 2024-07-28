"use client"

import { getStrengths } from '@/lib/client/strength';
import { Strength } from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

const initialState: { strengths: Strength[]|null, loading: boolean, error: null|string } = {
  strengths: null,
  loading: false,
  error: null,
}

export const fetchStrengths = createAsyncThunk('resume/strengths/fetch', async(resumeId: string, { rejectWithValue }) => {
  try {
    return await getStrengths(resumeId);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const slice = createSlice({
  name: 'strength',
  initialState,
  reducers: {
    setStrength: (state, action) => {
      if (!state.strengths) state.strengths = [];
      const index = state.strengths.findIndex(strength => strength.id === action.payload.id);
      if (index >= 0) {
        state.strengths[index] = action.payload;
      } else {
        state.strengths.push(action.payload);
      }
    },
    removeStrength: (state, action) => {
      if (!state.strengths) return;
      state.strengths = state.strengths.filter(strength => strength.id !== action.payload);
    },
    setStrengths: (state, action) => {
      state.strengths = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStrengths.pending, (state) => {
        state.loading = true;
        state.strengths = null;
        state.error = null;
      })
      .addCase(fetchStrengths.fulfilled, (state, action) => {
        state.strengths = action.payload ?? [];
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchStrengths.rejected, (state, action) => {
        state.strengths = [];
        state.error = action.payload as string;
        state.loading = false;
      })
  }
})

export const { 
  setStrength, removeStrength, clear, setStrengths
} = slice.actions;

export const selectStrength = (state: RootState) => state.strength;
export const selectStrengthList = (state: RootState) => state.strength.strengths;
export const selectStrengthLoading = (state: RootState) => state.strength.loading;
export const selectStrengthById = (state: RootState, id: string) => state.strength.strengths?.find(strength => strength.id === id) ?? null

export default slice.reducer