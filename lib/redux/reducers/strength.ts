import { getStrengths } from '@/lib/client/strength';
import { Resume, Strength } from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

const initialState: { strengths: Strength[], loading: boolean, error: null|string } = {
  strengths: [],
  loading: false,
  error: null,
}

export const fetchStrengths = createAsyncThunk('resume/strengths/fetch', async(resume: Resume, { rejectWithValue }) => {
  try {
    return await getStrengths(resume.id);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const slice = createSlice({
  name: 'strength',
  initialState,
  reducers: {
    setStrength: (state, action) => {
      const index = state.strengths.findIndex(strength => strength.id === action.payload.id);
      if (index >= 0) {
        state.strengths[index] = action.payload;
      } else {
        state.strengths.push(action.payload);
      }
    },
    removeStrength: (state, action) => {
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
        state.strengths = [];
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

export default slice.reducer