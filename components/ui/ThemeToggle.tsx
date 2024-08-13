"use client"

import { useEffect, useState } from "react"
import { FaMoon, FaSpinner, FaSun } from "react-icons/fa"

const localStorageKey = 'theme';
const darkThemeValue = 'dark';
const lightThemeValue = 'light'

const getDefaultDarkMode = (darkThemeValue: string, localStorageKey: string, checkWindow: boolean = true) => {
    if (checkWindow) if (typeof window === 'undefined') return false;
    const localTheme = localStorage.getItem(localStorageKey) || undefined;
    if (localTheme) return localTheme === darkThemeValue;
    return window.matchMedia(`(prefers-color-scheme: dark)`).matches;
}

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(() => getDefaultDarkMode(darkThemeValue, localStorageKey));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [])

    useEffect(() => {
       applyTheme(darkMode, darkThemeValue);
    }, [darkMode])

    const applyTheme = (isDarkMode: boolean, darkThemeValue: string) => {
        isDarkMode ? document.documentElement.classList.add(darkThemeValue) : document.documentElement.classList.remove(darkThemeValue);
        const input = document.querySelector('input[type="checkbox"].theme-toggle') as HTMLInputElement|undefined
        if (input) input.checked = isDarkMode;
    }

    const toggleMode = (isDarkMode: boolean) => {
        localStorage.setItem(localStorageKey, isDarkMode ? darkThemeValue : lightThemeValue);
        setDarkMode(isDarkMode);
    }    

    const script = (getDefaultDarkMode: (darkThemeValue: string, localStorageKey: string, checkWindow: boolean) => boolean, applyTheme: (isDarkMode: boolean, darkThemeValue: string) => void, darkThemeValue: string, localStorageKey: string) => {
        applyTheme(getDefaultDarkMode(darkThemeValue, localStorageKey, false), darkThemeValue)
    }

    return (
        <div>
            <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `(${script.toString()})(${getDefaultDarkMode}, ${applyTheme}, ${JSON.stringify([darkThemeValue, localStorageKey]).slice(1, -1)})`}} />
            <label className="relative flex justify-between items-center group p-2 cursor-pointer">
                <input type="checkbox" className="theme-toggle sr-only peer" onChange={() => toggleMode(!darkMode)}/>
                <span className={`w-16 h-8 flex p-1 shadow-sm dark:shadow-none ring-1 ring-slate-700/10 dark:ring-slate-700 bg-gradient-to-r from-cyan-300 to-cyan-500 rounded-full ${loading ? 'after:translate-x-4' : ''} duration-300 ease-in-out peer-checked:bg-gradient-to-r peer-checked:from-slate-900 peer-checked:to-slate-400 after:w-6 after:h-6 after:bg-white after:dark:bg-slate-900 after:ring-1 after:ring-slate-700/10 after:dark:ring-slate-700 after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-8 group-hover:after:translate-x-1 group-hover:after:peer-checked:translate-x-7`}></span>
                
                {loading ? (
                    <>
                        <span className="absolute z-10 text-slate-400 translate-x-6"><FaSpinner className="animate-spin"/></span>
                    </>
                ) : (
                    <>
                        <span className="absolute z-10 text-orange-400 translate-x-2 duration-300 ease-in-out peer-checked:translate-x-10 peer-checked:opacity-0 group-hover:translate-x-3"><FaSun/></span>
                        <span className="absolute z-10 opacity-0 text-slate-500 translate-x-2 duration-300 ease-in-out peer-checked:opacity-100 peer-checked:translate-x-10 peer-checked:block group-hover:peer-checked:translate-x-9"><FaMoon /></span>
                    </>
                )}
                
            </label>
        </div>
    )
}