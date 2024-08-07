"use client"

import { SectionEnums, SectionType } from '@/types/section';
import { createSlice } from '@reduxjs/toolkit'

enum ItemTypeEnums {
  single = 'single',
  list = 'list'
}
type ItemType = keyof typeof ItemTypeEnums;

type SiblingType = {
  parentId: string
}

type SectionConfig = {
  name: SectionType
  itemType: ItemType,
  sibling?: SiblingType,
}

const createSectionConfig = (section: SectionType, 
  { itemType = ItemTypeEnums.list, sibling }: { itemType?: ItemType, sibling?: SiblingType } = {}
): SectionConfig => ({
  name: section,
  itemType,
  sibling
})

const sectionConfigs: SectionConfig[] = [
  createSectionConfig(SectionEnums.personal, { itemType: ItemTypeEnums.single }),
  createSectionConfig(SectionEnums.education),
  createSectionConfig(SectionEnums.employment),
  createSectionConfig(SectionEnums.employmentHistory, { sibling: { parentId: 'employmentId' }}),
  createSectionConfig(SectionEnums.skill),
  createSectionConfig(SectionEnums.strength)
];

const createSingleReducers = () => ({
  setItem: (_state, action) => action.payload,
})

const createListReducers = (sectionConfig: SectionConfig) => ({
  setItems: (state, action) => {
    if (sectionConfig.sibling) {
      if (!state[action.payload.parentId]) {
        state[action.payload.parentId] = [];
      }
      state[action.payload.parentId] = action.payload.items
    } else {
      return action.payload.items;
    }
  },
  addItem: (state, action) => {
    if (sectionConfig.sibling) {
      state[action.payload[sectionConfig.sibling.parentId]].push(action.payload);
    } else {
      state.push(action.payload);
    }
  },
  updateItem: (state, action) => {
    if (sectionConfig.sibling) {
      const index = state[action.payload[sectionConfig.sibling.parentId]].findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[action.payload[sectionConfig.sibling.parentId]][index] = action.payload;
      }
    } else {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  },
  removeItem: (state, action) => {
    if (sectionConfig.sibling) {
      const index = state[action.payload[sectionConfig.sibling.parentId]].findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[action.payload[sectionConfig.sibling.parentId]].splice(index, 1);
      }
    } else {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }
  },
})

const createReducers = (sectionConfig: SectionConfig, initialState: any) => {
  const baseReducers = { clear: () => initialState };
  switch (sectionConfig.itemType) {
    case ItemTypeEnums.list:
      return {...baseReducers, ...createListReducers(sectionConfig)}
    case ItemTypeEnums.single:
      return {...baseReducers, ...createSingleReducers()}
  }
}

const createSelectors = (sectionConfig: SectionConfig) => {
  switch(sectionConfig.itemType) {
    case ItemTypeEnums.list:
      if (sectionConfig.sibling) {
        return {
          selectItems: (state, { parentId }) => {
            return state[sectionConfig.name][parentId]
          },
          selectItemById: (state, { parentId, id }) => state[sectionConfig.name][parentId]?.find(item => item.id === id) ?? null
        }
      }
      return {
        selectItems: (state) => state[sectionConfig.name], 
        selectItemById: (state, { id }) => state[sectionConfig.name]?.find(item => item.id === id) ?? null 
      }
    case ItemTypeEnums.single:
      return {
        selectItem: (state) => state[sectionConfig.name],
      }
  }
}

const createInitialState = (sectionConfig: SectionConfig) => (
  sectionConfig.itemType === ItemTypeEnums.list ? sectionConfig.sibling ? {} : null : null
)

let sections = {};
let allReducers = {};
for (const sectionConfig of sectionConfigs) {
  const initialState = createInitialState(sectionConfig);

  const slice = createSlice({
    name: sectionConfig.name,
    initialState,
    reducers: createReducers(sectionConfig, initialState)
  })

  sections = {...sections, [sectionConfig.name]: { actions: slice.actions, selectors: createSelectors(sectionConfig) }}
  allReducers = {...allReducers, [sectionConfig.name]: slice.reducer};
}

export const reducers = allReducers;

export function getStateSection(sectionType: SectionType) { return sections[sectionType] }