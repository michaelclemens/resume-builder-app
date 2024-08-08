"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { ResumeFull } from '@/lib/client/resume';
import { JsonValue } from '@prisma/client/runtime/library';

const initialState: ResumeFull|null = null

export const slice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResume: (_state, action) => action.payload,
    setTemplate: (state, action) => ({
      ...state ?? {},
      template: action.payload
    }),
    setTemplateOptions: (state, action: PayloadAction<JsonValue>) => ({
      ...state ?? {},
      templateOptions: action.payload
    }),
    clear: _state => initialState
  }
})

export const { clear, setResume, setTemplate, setTemplateOptions } = slice.actions;

export const selectResume = (state: RootState): ResumeFull|null => state.resume;

export default slice.reducer