"use client"

import { ListItemType, SectionEnums, SectionType, SingleItemType } from '@/types/section';
import { Education, Employment, EmploymentHistory, Personal, Skill, Strength } from '@prisma/client';
import { createSlice, PayloadAction, SliceCaseReducers, SliceSelectors, ValidateSliceCaseReducers } from '@reduxjs/toolkit'

type GenericState<T> = T | null

const singleItemReducers = ({
  setItem: (_state: GenericState<SingleItemType>, { payload }: PayloadAction<SingleItemType>) => payload
})

const listItemReducers = ({
  setItems: (state: GenericState<ListItemType[]|null>, { payload }: PayloadAction<{ items: ListItemType[], parentId?: string, parentProperty?: string }>) => {
    if (state && payload.parentId && payload.parentProperty) {
      state = state.filter((item: ListItemType) => item[payload.parentProperty] !== payload.parentId);
    }
    state = payload.items;
  },
  addItem: (state: GenericState<ListItemType[]>, { payload }: PayloadAction<ListItemType>) => {
    if (!state) state = [];
    state.push(payload);
  },
  updateItem: (state: GenericState<ListItemType[]>, { payload }: PayloadAction<ListItemType>) => {    
    if (!state) return;
    const index = state.findIndex(({ id }: ListItemType) => id === payload.id);
    if (index === -1) return;
    state[index] = payload;
  },
  removeItem: (state: GenericState<ListItemType[]>, { payload }: PayloadAction<ListItemType>) => {
    if (!state) return;
    const index = state.findIndex(({ id }: ListItemType) => id === payload.id);
    if (index === -1) return;
    state.splice(index, 1);
  }
})

const singleItemSelectors = ({
  selectItem: (state: GenericState<SingleItemType>) => state,
})

const listItemSelectors = ({
  selectItems: (state: GenericState<ListItemType[]>, { parentId, parentProperty }: { parentId?: string, parentProperty?: string }) => {
    if (state && parentId && parentProperty) {
      return state.filter((item: ListItemType) => item[parentProperty] === parentId);
    }
    return state;
  }
})

const createSectionSlice = <State, Name extends SectionType, Reducers extends SliceCaseReducers<State>, Selectors extends SliceSelectors<State>> (
  { name, initialState, reducers, selectors }
  : { name: Name, initialState: State, reducers: ValidateSliceCaseReducers<State, Reducers>, selectors: Selectors}
) => (
  createSlice({
    name,
    initialState,
    reducers: {
      reset: () => initialState,
      ...reducers
    },
    selectors: {
      ...selectors
    }
  })
)

const personalSlice = createSectionSlice({
    name: SectionEnums.personal,
    initialState: null as GenericState<Personal|null>,
    reducers: singleItemReducers,
    selectors: singleItemSelectors
});

const educationSlice = createSectionSlice({
  name: SectionEnums.education,
  initialState: null as GenericState<Education[]|null>,
  reducers: listItemReducers,
  selectors: listItemSelectors
});

const employmentSlice = createSectionSlice({
  name: SectionEnums.employment,
  initialState: null as GenericState<Employment[]|null>,
  reducers: listItemReducers,
  selectors: listItemSelectors
});

const employmentHistorySlice = createSectionSlice({
  name: SectionEnums.employmentHistory,
  initialState: null as GenericState<EmploymentHistory[]|null>,
  reducers: listItemReducers,
  selectors: listItemSelectors
});

const skillSlice = createSectionSlice({
  name: SectionEnums.skill,
  initialState: null as GenericState<Skill[]|null>,
  reducers: listItemReducers,
  selectors: listItemSelectors
});

const strengthSlice = createSectionSlice({
  name: SectionEnums.strength,
  initialState: null as GenericState<Strength[]|null>,
  reducers: listItemReducers,
  selectors: listItemSelectors
});

const allSlices = {
  personal: personalSlice,
  education: educationSlice,
  employment: employmentSlice,
  employmentHistory: employmentHistorySlice,
  skill: skillSlice,
  strength: strengthSlice,
}

export const getStateSection = <Name extends SectionType>(sectionType: Name): { actions: typeof allSlices[Name]['actions'], selectors: typeof allSlices[Name]['selectors'] } => (
  { actions: allSlices[sectionType].actions, selectors: allSlices[sectionType].selectors }
);

export default {
  [SectionEnums.personal]: personalSlice.reducer,
  [SectionEnums.education]: educationSlice.reducer,
  [SectionEnums.employment]: employmentSlice.reducer,
  [SectionEnums.employmentHistory]: employmentHistorySlice.reducer,
  [SectionEnums.skill]: skillSlice.reducer,
  [SectionEnums.strength]: strengthSlice.reducer,
}