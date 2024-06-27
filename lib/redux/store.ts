import { configureStore } from '@reduxjs/toolkit';
import reducers from '@/lib/redux/reducers';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== "production",
});

type AppStore = typeof store
type AppDispatch = typeof store.dispatch
type RootState = ReturnType<AppStore['getState']>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()