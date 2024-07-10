import { getPersonal } from '@/lib/client/personal';
import { Personal, Resume } from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

const initialState: { personal: null|Personal, loading: boolean, error: null|string  } = {
  personal: null,
  loading: false,
  error: null,
}

export const fetchPersonal = createAsyncThunk('resume/personal/fetch', async(resume: Resume, { rejectWithValue }) => {
    try {
      return await getPersonal(resume.id);
    } catch (error) {
      return rejectWithValue(error);
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
        state.personal = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchPersonal.rejected, (state, action) => {
        state.personal = null;       
        state.error = action.payload as string;
        state.loading = false;
      })
  }
})

export const { setPersonal, clear } = slice.actions;

export const selectPersonal = (state: RootState) => state.personal;
export const selectPersonalDetails = (state: RootState) => state.personal.personal;
export const selectPersonalLoading = (state: RootState) => state.personal.loading;

export default slice.reducer