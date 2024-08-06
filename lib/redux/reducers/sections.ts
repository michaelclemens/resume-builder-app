"use client"

import { createSlice } from '@reduxjs/toolkit'

export enum SectionEnums {
  personal = 'personal',
  education = 'education',
  employment = 'employment',
  skill = 'skill',
  strength = 'strength',
}

enum ItemTypeEnums {
  single = 'single',
  list = 'list'
}

type ItemType = keyof typeof ItemTypeEnums;
type SectionType = keyof typeof SectionEnums;
type SiblingType = {
  property: string
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
  createSectionConfig(SectionEnums.employment, { sibling: { property: 'history', parentId: 'employmentId' }}),
  createSectionConfig(SectionEnums.skill),
  createSectionConfig(SectionEnums.strength)
];

const createSingleReducers = () => ({
  setItem: (state, action) => {
    state.item = action.payload;
  },
})

const createListReducers = () => ({
  setItem: (state, action) => {
    if (!state.items) state.items = [];
    const index = state.items.findIndex(item => item.id === action.payload.id);
    if (index >= 0) {
      state.items[index] = action.payload;
    } else {
      state.items.push(action.payload);
    }
  },
  removeItem: (state, action) => {
    if (!state.items) return;
    state.items = state.items.filter(item => item.id !== action.payload);
  },
  setItems: (state, action) => {
    state.items = action.payload;
  },
})

const createSiblingReducers = (sectionConfig: SectionConfig) => {
  const { property, parentId } = sectionConfig.sibling;
  return ({
    setSiblingItem: (state, action) => {
      if (!state.items) return;
      const parentIndex = state.items.findIndex(item => item.id === action.payload[parentId]);
      if (parentIndex < 0) return;

      const index = state.items[parentIndex][property].findIndex(item => item.id === action.payload.id);      
      if (index >= 0) {
        state.items[parentIndex][property][index] = action.payload;
      } else {
        state.items[parentIndex][property].push(action.payload);
      }
    },
    removeSiblingItem: (state, action) => {
      if (!state.items) return;
      const parentIndex = state.items.findIndex(item => item.id === action.payload[parentId]);
      if (parentIndex < 0) return;

      state.items[parentIndex][property] = state.items[parentIndex][property].filter(item => item.id !== action.payload.id);
    },
    setSiblingItems: (state, action) => {
      if (!state.items) return;
      const parentIndex = state.items.findIndex(item => item.id === action.payload[parentId]);
      if (parentIndex < 0) return;

      state.items[parentIndex][property] = action.payload.items;
    }
  })
}

const createReducers = (sectionConfig: SectionConfig, initialState: any) => {
  let baseReducers = { clear: () => initialState };
  if (sectionConfig.sibling) baseReducers = {...baseReducers, ...createSiblingReducers(sectionConfig)}
  switch (sectionConfig.itemType) {
    case ItemTypeEnums.list:
      return {...baseReducers, ...createListReducers()}
    case ItemTypeEnums.single:
      return {...baseReducers, ...createSingleReducers()}
  }
}

const createSelectors = (sectionConfig: SectionConfig) => {
  switch(sectionConfig.itemType) {
    case ItemTypeEnums.list:
      return {
        selectItems: (state) => state[sectionConfig.name].items, 
        selectItemById: (state, id) => state[sectionConfig.name].items?.find(item => item.id === id) ?? null 
      }
    case ItemTypeEnums.single:
      return {
        selectItem: (state) => state[sectionConfig.name].item,
      }
  }
}

let sections = {};
let allReducers = {};
for (const sectionConfig of sectionConfigs) {
  const initialState = sectionConfig.itemType === ItemTypeEnums.list ? { items: null } : { item: null };

  const slice = createSlice({
    name: sectionConfig.name,
    initialState,
    reducers: createReducers(sectionConfig, initialState)
  })

  sections = {...sections, [sectionConfig.name]: { actions: slice.actions, selectors: createSelectors(sectionConfig) }}
  allReducers = {...allReducers, [sectionConfig.name]: slice.reducer};
}

export const reducers = allReducers;

export const getSection = (section: SectionType) => sections[section];