'use client'

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

const localStorageKey = 'theme'
const darkThemeValue = 'dark'
const lightThemeValue = 'light'

type UseThemeReturn = { darkMode: boolean; toggleMode: (isDarkMode: boolean) => void }

const ThemeContext = createContext<UseThemeReturn>({ darkMode: false, toggleMode: () => {} })

const getDefaultDarkMode = (darkThemeValue: string, localStorageKey: string, checkWindow: boolean = true) => {
  if (checkWindow) if (typeof window === 'undefined') return false
  const localTheme = localStorage.getItem(localStorageKey) || undefined
  if (localTheme) return localTheme === darkThemeValue
  return window.matchMedia(`(prefers-color-scheme: dark)`).matches
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => getDefaultDarkMode(darkThemeValue, localStorageKey))

  const applyTheme = (isDarkMode: boolean, darkThemeValue: string) => {
    isDarkMode ? document.documentElement.classList.add(darkThemeValue) : document.documentElement.classList.remove(darkThemeValue)
  }

  useEffect(() => {
    applyTheme(darkMode, darkThemeValue)
  }, [darkMode])

  const toggleMode = (isDarkMode: boolean) => {
    localStorage.setItem(localStorageKey, isDarkMode ? darkThemeValue : lightThemeValue)
    setDarkMode(isDarkMode)
  }

  const script = (
    getDefaultDarkMode: (darkThemeValue: string, localStorageKey: string, checkWindow: boolean) => boolean,
    applyTheme: (isDarkMode: boolean, darkThemeValue: string) => void,
    darkThemeValue: string,
    localStorageKey: string
  ) => {
    applyTheme(getDefaultDarkMode(darkThemeValue, localStorageKey, false), darkThemeValue)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleMode }}>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})(${getDefaultDarkMode}, ${applyTheme}, ${JSON.stringify([darkThemeValue, localStorageKey]).slice(1, -1)})`,
        }}
      />
      {children}
    </ThemeContext.Provider>
  )
}

export default function useTheme() {
  return useContext(ThemeContext)
}
