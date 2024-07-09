import { getFullResume, ResumeFull } from '@/lib/client/resume';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState: { resume: null|ResumeFull, loading: boolean, error: string } = {
  resume: null,
  loading: false,
  error: '',
}

export const fetchResume = createAsyncThunk('resume/fetch', async(id: string, { rejectWithValue }) => {
  try {
    const response = await getFullResume(id);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setPersonal: (state, action) => {
      if (!state.resume) return;
      state.resume.personal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResume.pending, (state) => {
        state.loading = true;
        state.resume = null;
        state.error = '';
      })
      .addCase(fetchResume.fulfilled, (state, action) => {
        state.resume = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchResume.rejected, (state, action) => {
        state.error = action.payload as string;
        state.resume = null;
        state.loading = false;
      })
  }
})

export const { setPersonal } = resumeSlice.actions

export default resumeSlice.reducer