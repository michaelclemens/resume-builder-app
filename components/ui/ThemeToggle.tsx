'use client'

import { FaMoon, FaSun } from 'react-icons/fa'
import useTheme from '@/hooks/useTheme'

export const lightModeTitle = 'Light Mode'
export const darkModeTitle = 'Dark Mode'

export default function ThemeToggle() {
  const { darkMode, toggleMode } = useTheme()
  return (
    <div>
      <label className="group relative z-20 flex cursor-pointer items-center justify-between p-2">
        <input type="checkbox" className="sr-only" onChange={() => toggleMode(!darkMode)} />
        <span
          className={`flex h-8 w-16 rounded-full bg-gradient-to-r from-cyan-200 to-cyan-600 p-1 ring-1 ring-slate-400/20 dark:from-black dark:to-slate-600`}
        >
          <span className="h-6 w-6 rounded-full bg-white ring-1 ring-slate-400/20 duration-300 group-hover:translate-x-1 dark:translate-x-8 dark:bg-slate-900 group-hover:dark:translate-x-7" />
        </span>
        <span
          title={darkModeTitle}
          className="absolute translate-x-10 text-slate-500 opacity-0 duration-300 ease-in-out dark:opacity-100 group-hover:dark:translate-x-9"
        >
          <FaMoon />
        </span>
        <span
          title={lightModeTitle}
          className="absolute translate-x-2 text-orange-400 opacity-100 duration-300 ease-in-out group-hover:translate-x-3 dark:opacity-0"
        >
          <FaSun />
        </span>
      </label>
    </div>
  )
}
