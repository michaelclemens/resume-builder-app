'use client'

import { Education, EmploymentHistory, Personal, Skill, Strength } from '@prisma/client'
import { createSelector, createSlice, PayloadAction, SliceCaseReducers, SliceSelectors, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { EmploymentWithHistory, ListItemType, SectionEnums, SectionItemType, SectionType, SingleItemType } from '@/types/section'

type GenericState<T> = T | null

const singleItemReducers = {
  setItem: <ItemType extends SingleItemType>(_state: GenericState<ItemType>, { payload }: PayloadAction<ItemType>) => payload,
  addItem: <ItemType extends SectionItemType>(state: GenericState<ItemType | null>, { payload }: PayloadAction<ItemType>) => {
    state = payload
    return state
  },
  updateItem: <ItemType extends SectionItemType>(state: GenericState<ItemType | null>, { payload }: PayloadAction<ItemType>) => {
    state = payload
    return state
  },
}

const listItemReducers = {
  setItems: <ItemType extends ListItemType>(
    state: GenericState<ItemType[] | null>,
    { payload }: PayloadAction<{ items: ItemType[]; parentId?: string; parentProperty?: keyof ItemType }>
  ) => {
    if (state && payload.parentId && payload.parentProperty) {
      state = state.filter(item => payload.parentProperty && item[payload.parentProperty] !== payload.parentId) ?? []
      for (const item of payload.items) {
        state.push(item)
      }
      return state
    }
    state = payload.items
    return state
  },
  addItem: <ItemType extends SectionItemType>(state: GenericState<ItemType[] | null>, { payload }: PayloadAction<ItemType>) => {
    if (!state) state = []
    state.push(payload)
    return state
  },
  updateItem: <ItemType extends SectionItemType>(state: GenericState<ItemType[] | null>, { payload }: PayloadAction<ItemType>) => {
    if (!state) return
    const index = state.findIndex(({ id }) => id === payload.id)
    if (index === -1) return
    state[index] = payload
    return state
  },
  removeItem: <ItemType extends ListItemType>(state: GenericState<ItemType[] | null>, { payload }: PayloadAction<ItemType>) => {
    if (!state) return
    const index = state.findIndex(({ id }) => id === payload.id)
    if (index === -1) return
    state.splice(index, 1)
    return state
  },
}

const singleItemSelectors = {
  selectItem: <ItemType extends SingleItemType>(state: GenericState<ItemType | null>) => state,
}

const selectItemsById = createSelector(
  [state => state, (_state, parentProperty) => parentProperty, (_state, _parentProperty, parentId) => parentId],
  (state, parentProperty: keyof ListItemType, parentId) => state.filter((item: ListItemType) => item[parentProperty] === parentId)
)

const listItemSelectors = {
  selectItems: <ItemType extends ListItemType>(
    state: GenericState<ItemType[] | null>,
    { parentId, parentProperty }: { parentId?: string; parentProperty?: string }
  ): ItemType[] | null => {
    if (state && parentId && parentProperty) {
      return selectItemsById(state, parentProperty, parentId)
    }
    return state
  },
}

const createSectionSlice = <State, Name extends SectionType, Reducers extends SliceCaseReducers<State>, Selectors extends SliceSelectors<State>>({
  name,
  initialState,
  reducers,
  selectors,
}: {
  name: Name
  initialState: State
  reducers: ValidateSliceCaseReducers<State, Reducers>
  selectors: Selectors
}) =>
  createSlice({
    name,
    initialState,
    reducers: {
      reset: () => initialState,
      ...reducers,
    },
    selectors: {
      ...selectors,
    },
  })

const personalSlice = createSectionSlice({
  name: SectionEnums.personal,
  initialState: null as GenericState<Personal | null>,
  reducers: singleItemReducers,
  selectors: singleItemSelectors,
})

const educationSlice = createSectionSlice({
  name: SectionEnums.education,
  initialState: null as GenericState<Education[] | null>,
  reducers: listItemReducers,
  selectors: listItemSelectors,
})

const employmentSlice = createSectionSlice({
  name: SectionEnums.employment,
  initialState: null as GenericState<EmploymentWithHistory[] | null>,
  reducers: listItemReducers,
  selectors: listItemSelectors,
})

const employmentHistorySlice = createSectionSlice({
  name: SectionEnums.employmentHistory,
  initialState: null as GenericState<EmploymentHistory[] | null>,
  reducers: listItemReducers,
  selectors: listItemSelectors,
})

const skillSlice = createSectionSlice({
  name: SectionEnums.skill,
  initialState: null as GenericState<Skill[] | null>,
  reducers: listItemReducers,
  selectors: listItemSelectors,
})

const strengthSlice = createSectionSlice({
  name: SectionEnums.strength,
  initialState: null as GenericState<Strength[] | null>,
  reducers: listItemReducers,
  selectors: listItemSelectors,
})

const allSlices = {
  personal: personalSlice,
  education: educationSlice,
  employment: employmentSlice,
  employmentHistory: employmentHistorySlice,
  skill: skillSlice,
  strength: strengthSlice,
}

export const getStateSection = <Name extends SectionType>(
  sectionType: Name
): { actions: (typeof allSlices)[Name]['actions']; selectors: (typeof allSlices)[Name]['selectors'] } => ({
  actions: allSlices[sectionType].actions,
  selectors: allSlices[sectionType].selectors,
})

const allReducers = {
  [SectionEnums.personal]: personalSlice.reducer,
  [SectionEnums.education]: educationSlice.reducer,
  [SectionEnums.employment]: employmentSlice.reducer,
  [SectionEnums.employmentHistory]: employmentHistorySlice.reducer,
  [SectionEnums.skill]: skillSlice.reducer,
  [SectionEnums.strength]: strengthSlice.reducer,
}

export default allReducers
