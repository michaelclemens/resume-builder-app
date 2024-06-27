import { getResume } from '@/lib/actions';
import { Resume } from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState: {loading: boolean, resume: null|Resume} = {
  loading: true,
  resume: null
}

export const fetchResume = createAsyncThunk('resume/fetch', async(id: string) => {
  const response = await getResume(id)
  return response;
});

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResume.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchResume.fulfilled, (state, action) => {
        const { payload } = action;
        state.resume = payload;
        state.loading = false
      })
  }
})

export const { } = resumeSlice.actions

export default resumeSlice.reducer