import { EmploymentWithHistory, getEmployments } from '@/lib/client/employment';
import { Resume } from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

const initialState: { employments: EmploymentWithHistory[], loading: boolean, error: null|string } = {
  employments: [],
  loading: false,
  error: null,
}

export const fetchEmployments = createAsyncThunk('resume/employments/fetch', async(resume: Resume, { rejectWithValue }) => {
  try {
    return await getEmployments(resume.id);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const slice = createSlice({
  name: 'employment',
  initialState,
  reducers: {
    setEmployment: (state, action) => {
      const index = state.employments.findIndex(employment => employment.id === action.payload.id);
      if (index >= 0) {
        action.payload.history = [...state.employments[index].history];
        state.employments[index] = action.payload;
      } else {
        action.payload.history = [];
        state.employments.push(action.payload);
      }
    },
    setEmploymentHistory: (state, action) => {
      const employmentId = action.payload.employmentId;
      const index = state.employments[employmentId].history.findIndex(history => history.id === action.payload.id);
      if (index >= 0) {
        state.employments[employmentId].history[index] = action.payload;
      } else {
        state.employments[employmentId].history.push(action.payload);
      }
    },
    removeEmployment: (state, action) => {
      state.employments = state.employments.filter(employment => employment.id !== action.payload);
    },
    removeEmploymentHistory: (state, action) => {
      const index = state.employments.findIndex(employment => employment.id === action.payload.employmentId);
      if (index >= 0) {
        state.employments[index].history = state.employments[index].history.filter(history => history.id !== action.payload.id)
      }
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployments.pending, (state) => {
        state.loading = true;
        state.employments = [];
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
  setEmployment, setEmploymentHistory, removeEmployment, removeEmploymentHistory, clear
} = slice.actions;

export const selectEmployment = (state: RootState) => state.employment;
export const selectEmploymentList = (state: RootState) => state.employment.employments;
export const selectEmploymentLoading = (state: RootState) => state.employment.loading;

export default slice.reducer