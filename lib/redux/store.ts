'use client'

import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import reducers from '@/lib/redux/reducers'

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  })

export type RootState = ReturnType<typeof reducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
