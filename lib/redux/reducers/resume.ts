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
    },
    setEmployment: (state, action) => {
      if (!state.resume) return;
      const index = state.resume.employments.findIndex(e => e.id === action.payload.id);
      if (index >= 0) {
        action.payload.history = [...state.resume.employments[index].history];
        state.resume.employments[index] = action.payload;
      } else {
        action.payload.history = [];
        state.resume.employments.push(action.payload);
      }
    },
    setEmploymentHistory: (state, action) => {
      if (!state.resume) return;
      const employmentId = action.payload.employmentId;
      const index = state.resume.employments[employmentId].history.findIndex(e => e.id === action.payload.id);
      if (index >= 0) {
        state.resume.employments[employmentId].history[index] = action.payload;
      } else {
        state.resume.employments[employmentId].history.push(action.payload);
      }
    },
    setEducation: (state, action) => {
      if (!state.resume) return;
      const index = state.resume.educations.findIndex(e => e.id === action.payload.id);
      if (index >= 0) {
        state.resume.educations[index] = action.payload;
      } else {
        state.resume.educations.push(action.payload);
      }
    },
    setSkill: (state, action) => {
      if (!state.resume) return;
      const index = state.resume.skills.findIndex(e => e.id === action.payload.id);
      if (index >= 0) {
        state.resume.skills[index] = action.payload;
      } else {
        state.resume.skills.push(action.payload);
      }
    },
    setStrength: (state, action) => {
      if (!state.resume) return;
      const index = state.resume.strengths.findIndex(e => e.id === action.payload.id);
      if (index >= 0) {
        state.resume.strengths[index] = action.payload;
      } else {
        state.resume.strengths.push(action.payload);
      }
    },
    removeEmployment: (state, action) => {
      if (!state.resume) return;
      state.resume.employments = state.resume.employments.filter(e => e.id !== action.payload);
    },
    removeEmploymentHistory: (state, action) => {
      if (!state.resume) return;
      const index = state.resume.employments.findIndex(e => e.id === action.payload.employmentId);
      if (index >= 0) {
        state.resume.employments[index].history = state.resume.employments[index].history.filter(e => e.id !== action.payload.id)
      }
    },
    removeEducation: (state, action) => {
      if (!state.resume) return;
      state.resume.educations = state.resume.educations.filter(e => e.id !== action.payload);
    },
    removeSkill: (state, action) => {
      if (!state.resume) return;
      state.resume.skills = state.resume.skills.filter(e => e.id !== action.payload);
    },
    removeStrength: (state, action) => {
      if (!state.resume) return;
      state.resume.strengths = state.resume.strengths.filter(e => e.id !== action.payload);
    },
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

export const { 
  setPersonal, setEmployment, setEmploymentHistory, setEducation, setSkill, setStrength, removeEmployment, removeEmploymentHistory, removeEducation, removeSkill, removeStrength,
} = resumeSlice.actions

export default resumeSlice.reducer