"use client"

import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { ResumeFull } from '@/lib/client/resume';

const initialState: ResumeFull|null = null

export const slice = createSlice({
  name: 'resume',
  initialState: initialState as ResumeFull|null,
  reducers: {
    reset: () => initialState,
    setResume: (_state, { payload }) => payload,
    setTemplate: (state, { payload }) => {
      if (!state) return;
      state.template = payload;
      return state;
    },
    setTemplateOptions: (state, { payload }) => {
      if (!state) return;
      state.templateOptions = payload;
      return state;
    }
  }
})

export const { reset, setResume, setTemplate, setTemplateOptions } = slice.actions;

export const selectResume = (state: RootState): ResumeFull|null => state.resume;

export default slice.reducer