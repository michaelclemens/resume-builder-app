import { PropsWithChildren } from 'react'
import { render, renderHook, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { AppStore, RootState, setupStore } from '@/lib/redux/store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

const getWrapper = (store) => (
  ({ children }: PropsWithChildren<{}>): JSX.Element => <Provider store={store}>{children}</Provider>
)

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  return { store, ...render(ui, { wrapper: getWrapper(store), ...renderOptions })}
}


export function renderHookWithProviders<Result, Props>(
  hook: (initialProps: Props) => Result,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  return { store, ...renderHook(hook, { wrapper: getWrapper(store), ...renderOptions })}
}