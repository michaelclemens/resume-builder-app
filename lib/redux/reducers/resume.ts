"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { ResumeFull } from '@/lib/client/resume';
import { Template } from '@prisma/client';
import { TemplateOptions } from '@/types/template';

const initialState: ResumeFull|null = null

export const slice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    reset: () => initialState,
    setResume: (_state: ResumeFull|null, { payload }: PayloadAction<ResumeFull>) => payload,
    setTemplate: (state: ResumeFull|null, { payload }: PayloadAction<Template>) => {
      if (!state) return;
      state.template = payload;
      return state;
    },
    setTemplateOptions: (state: ResumeFull|null, { payload }: PayloadAction<TemplateOptions>) => {
      if (!state) return;
      state.templateOptions = payload;
      return state;
    }
  }
})

export const { reset, setResume, setTemplate, setTemplateOptions } = slice.actions;

export const selectResume = (state: RootState): ResumeFull|null => state.resume;

export default slice.reducer