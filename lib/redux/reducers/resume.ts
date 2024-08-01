"use client"

import { getResume, ResumeFull } from '@/lib/client/resume';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

const initialState: { resume: null|ResumeFull, loading: boolean, error: null|Error } = {
  resume: null,
  loading: false,
  error: null,
}

export const fetchResume = createAsyncThunk('resume/fetch', async(id: string, { rejectWithValue }) => {
  try {
    return await getResume(id);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const slice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResume: (state, action) => {
      state.resume = action.payload;
    },
    setTemplate: (state, action) => {
      if (!state.resume) return;
      state.resume.template = action.payload;
    },
    setTemplateOptions: (state, action) => {
      if (!state.resume) return;
      state.resume.templateOptions = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResume.pending, (state) => {
        state.loading = true;
        state.resume = null;
        state.error = null;
      })
      .addCase(fetchResume.fulfilled, (state, action) => {
        state.resume = action.payload ?? null;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchResume.rejected, (state, action) => {
        state.resume = null;
        state.error = action.payload as Error;
        state.loading = false;
      })
  }
})

export const { clear, setResume, setTemplate, setTemplateOptions } = slice.actions;

export const selectResume = (state: RootState) => state.resume;

export default slice.reducer