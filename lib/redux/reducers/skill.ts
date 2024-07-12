import { getSkills } from '@/lib/client/skill';
import { Resume, Skill } from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

const initialState: { skills: Skill[], loading: boolean, error: null|string } = {
  skills: [],
  loading: false,
  error: null,
}

export const fetchSkills = createAsyncThunk('resume/skills/fetch', async(resume: Resume, { rejectWithValue }) => {
  try {
    return await getSkills(resume.id);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const slice = createSlice({
  name: 'skill',
  initialState,
  reducers: {
    setSkill: (state, action) => {
      const index = state.skills.findIndex(skill => skill.id === action.payload.id);
      if (index >= 0) {
        state.skills[index] = action.payload;
      } else {
        state.skills.push(action.payload);
      }
    },
    removeSkill: (state, action) => {
      state.skills = state.skills.filter(skill => skill.id !== action.payload);
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.skills = [];
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skills = action.payload ?? [];
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.skills = [];
        state.error = action.payload as string;
        state.loading = false;
      })
  }
})

export const { 
  setSkill, removeSkill, clear, setSkills
} = slice.actions;

export const selectSkill = (state: RootState) => state.skill;
export const selectSkillList = (state: RootState) => state.skill.skills;
export const selectSkillLoading = (state: RootState) => state.skill.loading;

export default slice.reducer