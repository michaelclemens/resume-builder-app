"use client"

import { EmploymentWithHistory, getEmployments } from '@/lib/client/employment';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

const initialState: { employments: EmploymentWithHistory[]|null, loading: boolean, error: null|string } = {
  employments: null,
  loading: false,
  error: null,
}

export const fetchEmployments = createAsyncThunk('resume/employments/fetch', async(resumeId: string, { rejectWithValue }) => {
  try {
    return await getEmployments(resumeId);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const slice = createSlice({
  name: 'employment',
  initialState,
  reducers: {
    setEmployment: (state, action) => {
      if (!state.employments) state.employments = [];
      const index = state.employments.findIndex(employment => employment.id === action.payload.id);
      if (index >= 0) {
        action.payload.history = [...state.employments[index].history];
        state.employments[index] = action.payload;
      } else {
        if (!action.payload.history) action.payload.history = [];
        state.employments.push(action.payload);
      }
    },
    setEmploymentHistory: (state, action) => {
      if (!state.employments) state.employments = [];
      const { employmentId } = action.payload;
      let index = state.employments.findIndex(employment => employment.id === employmentId);
      if (!state.employments[index]) state.employments.push({ id: employmentId, history: [] });
      index = state.employments.findIndex(employment => employment.id === employmentId);
      const historyIndex = state.employments[index].history.findIndex(history => history.id === action.payload.id);
      if (historyIndex >= 0) {
        state.employments[index].history[historyIndex] = action.payload;
      } else {
        state.employments[index].history.push(action.payload);
      }
    },
    removeEmployment: (state, action) => {
      if (!state.employments) return;
      state.employments = state.employments.filter(employment => employment.id !== action.payload);
    },
    removeEmploymentHistory: (state, action) => {
      if (!state.employments) return;
      const index = state.employments.findIndex(employment => employment.id === action.payload.employmentId);
      if (index >= 0) {
        state.employments[index].history = state.employments[index].history.filter(history => history.id !== action.payload.id)
      }
    },
    setEmployments: (state, action) => {
      state.employments = action.payload;
    },
    setEmploymentHistories: (state, action) => {
      if (!state.employments) return;
      const { employmentId, items } = action.payload;
      const index = state.employments.findIndex(employment => employment.id === employmentId);
      state.employments[index].history = items;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployments.pending, (state) => {
        state.loading = true;
        state.employments = null;
        state.error = null;
      })
      .addCase(fetchEmployments.fulfilled, (state, action) => {
        state.employments = action.payload ?? [];
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchEmployments.rejected, (state, action) => {
        state.employments = [];
        state.error = action.payload as string;
        state.loading = false;
      })
  }
})

export const { 
  setEmployment, setEmploymentHistory, removeEmployment, removeEmploymentHistory, setEmployments, setEmploymentHistories, clear
} = slice.actions;

export const selectEmployment = (state: RootState) => state.employment;
export const selectEmploymentList = (state: RootState) => state.employment.employments;
export const selectEmploymentLoading = (state: RootState) => state.employment.loading;
export const selectEmploymentById = (state: RootState, id: string) => state.employment.employments?.find(employment => employment.id === id) ?? null
export const selectEmploymentHistoryById = (state: RootState, employmentId: string, id: string) => state.employment.employments?.find(employment => employment.id === employmentId)?.history.find(h => h.id === id) ?? null;


export default slice.reducer