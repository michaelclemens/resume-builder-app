"use client"

import { getEducations } from '@/lib/client/education';
import { Education, Resume } from '@prisma/client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

const initialState: { educations: Education[], loading: boolean, error: null|string } = {
  educations: [],
  loading: false,
  error: null,
}

export const fetchEducations = createAsyncThunk('resume/educations/fetch', async(resume: Resume, { rejectWithValue }) => {
  try {
    return await getEducations(resume.id);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const slice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    setEducation: (state, action) => {
      const index = state.educations.findIndex(education => education.id === action.payload.id);
      if (index >= 0) {
        state.educations[index] = action.payload;
      } else {
        state.educations.push(action.payload);
      }
    },
    removeEducation: (state, action) => {
      state.educations = state.educations.filter(education => education.id !== action.payload);
    },
    setEducations: (state, action) => {
      state.educations = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducations.pending, (state) => {
        state.loading = true;
        state.educations = [];
        state.error = null;
      })
      .addCase(fetchEducations.fulfilled, (state, action) => {
        state.educations = action.payload ?? [];
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchEducations.rejected, (state, action) => {
        state.educations = [];
        state.error = action.payload as string;
        state.loading = false;
      })
  }
})

export const { 
  setEducation, removeEducation, setEducations, clear
} = slice.actions;

export const selectEducation = (state: RootState) => state.education;
export const selectEducationList = (state: RootState) => state.education.educations;
export const selectEducationLoading = (state: RootState) => state.education.loading;

export default slice.reducer