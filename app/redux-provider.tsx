'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { setupStore } from '@/lib/redux/store'

function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={setupStore()}>{children}</Provider>
}

export default ReduxProvider
