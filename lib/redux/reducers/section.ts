"use client"

import { SectionEnums, SectionType } from '@/types/section';
import { Education, Employment, EmploymentHistory, Personal, Skill, Strength } from '@prisma/client';
import { createSlice, EntityId, PayloadAction, SliceCaseReducers, SliceSelectors, ValidateSliceCaseReducers } from '@reduxjs/toolkit'

type GenericState<T> = T | null

const getSingleItemReducers = <Entity>() => ({
  setItem: (state: GenericState<Entity>, action: PayloadAction<Entity>) => {
    state = action.payload
  }
})

const getListItemReducers = <Entity>() => ({
  setItems: (state: GenericState<Entity[]|null>, action: PayloadAction<{ items: Entity[], parentId?: string }>) => {
    state = action.payload.items
  },
  addItem: (state: GenericState<Entity[]>, action: PayloadAction<{ item: Entity, parentId?: string }>) => {
    if (!state) return;
    state.push(action.payload.item);
  },
  updateItem: (state: GenericState<Entity[]>, action: PayloadAction<{ item: Entity, parentId?: string }>) => {    
    if (!state) return;
    const index = state.findIndex(({ id }: Entity) => id === action.payload.item.id);
    if (index === -1) return;
    state[index] = action.payload.item;
  },
  removeItem: (state: GenericState<Entity[]>, action: PayloadAction<{ id: string, parentId?: string }>) => {
    if (!state) return;
    const index = state.findIndex(({ id }: Entity) => id === action.payload.id);
    if (index === -1) return;
    state.splice(index, 1);
  }
})

const getSiblingItemReducers = <Entity>() => ({
  setItems: (state: GenericState<Record<EntityId, Entity[]|null>>, action: PayloadAction<{ items: Entity[], parentId?: string }>) => {
    if (!state || !action.payload.parentId) return;
    if (!state[action.payload.parentId]) state[action.payload.parentId] = [];
    state[action.payload.parentId] = action.payload.items;
  },
  addItem: (state: GenericState<Record<EntityId, Entity[]>>, action: PayloadAction<{ item: Entity, parentId?: string }>) => {
    if (!state || !action.payload.parentId) return;
    state[action.payload.parentId].push(action.payload.item)
  },
  updateItem: (state: GenericState<Record<EntityId, Entity[]>>, action: PayloadAction<{ item: Entity, parentId?: string }>) => {
    if (!state || !action.payload.parentId) return;
    const index = state[action.payload.parentId].findIndex(({ id }: Entity) => id === action.payload.item.id);
    if (index === -1) return;
    state[action.payload.parentId][index] = action.payload.item
  },
  removeItem: (state: GenericState<Record<EntityId, Entity[]>>, action: PayloadAction<{ id: string, parentId?: string }>) => {
    if (!state || !action.payload.parentId) return;
    const index = state[action.payload.parentId].findIndex(({ id }: Entity) => id === action.payload.id);
    if (index === -1) return;
    state[action.payload.parentId].splice(index, 1);
  }
})

const getSingleItemSelectors = <Entity>() => ({
  selectItem: (state: GenericState<Entity>) => state
})

const getListItemSelectors = <Entity>() => ({
  selectItems: (state: GenericState<Entity[]>) => state
})

const getSiblingItemSelectors = <Entity>() => ({
  selectItems: (state: GenericState<Record<EntityId, Entity[]>>,  { parentId }: { parentId?: string }) => state && parentId ? state[parentId] : null
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
    reducers: getSingleItemReducers<Personal>(),
    selectors: getSingleItemSelectors<Personal>()
});

const educationSlice = createSectionSlice({
  name: SectionEnums.education,
  initialState: null as GenericState<Education[]|null>,
  reducers: getListItemReducers<Education>(),
  selectors: getListItemSelectors<Education>()
});

const employmentSlice = createSectionSlice({
  name: SectionEnums.employment,
  initialState: null as GenericState<Employment[]|null>,
  reducers: getListItemReducers<Employment>(),
  selectors: getListItemSelectors<Employment>()
});

const employmentHistorySlice = createSectionSlice({
  name: SectionEnums.employmentHistory,
  initialState: {} as GenericState<Record<EntityId, EmploymentHistory[]>|null>,
  reducers: getSiblingItemReducers<EmploymentHistory>(),
  selectors: getSiblingItemSelectors<EmploymentHistory>()
});

const skillSlice = createSectionSlice({
  name: SectionEnums.skill,
  initialState: null as GenericState<Skill[]|null>,
  reducers: getListItemReducers<Skill>(),
  selectors: getListItemSelectors<Skill>()
});

const strengthSlice = createSectionSlice({
  name: SectionEnums.strength,
  initialState: null as GenericState<Strength[]|null>,
  reducers: getListItemReducers<Strength>(),
  selectors: getListItemSelectors<Strength>()
});

const allSlices = {
  personal: personalSlice,
  education: educationSlice,
  employment: employmentSlice,
  employmentHistory: employmentHistorySlice,
  skill: skillSlice,
  strength: strengthSlice,
}

export const getStateSection = <Name extends SectionType>(sectionType: Name): typeof allSlices[Name] => allSlices[sectionType];

export default {
  [SectionEnums.personal]: personalSlice.reducer,
  [SectionEnums.education]: educationSlice.reducer,
  [SectionEnums.employment]: employmentSlice.reducer,
  [SectionEnums.employmentHistory]: employmentHistorySlice.reducer,
  [SectionEnums.skill]: skillSlice.reducer,
  [SectionEnums.strength]: strengthSlice.reducer,
}