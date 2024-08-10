"use client"

import { useEffect, useState } from "react"
import { FaMoon, FaSpinner, FaSun } from "react-icons/fa"

const getSystemPreferences = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

const getDefaultDarkMode = () => {
    if (typeof window === 'undefined') return false;
    return getSystemPreferences();
}

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(getDefaultDarkMode);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [])

    useEffect(() => {
        applyTheme(darkMode);
    }, [darkMode])
    
    const applyTheme = (isDarkMode: boolean) => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        const input = document.querySelector('input[type="checkbox"].theme-toggle') as HTMLInputElement|undefined
        if (input) {
            input.checked = isDarkMode ? true : false
        }
    }

    const toggleMode = (isDarkMode: boolean) => {
        setDarkMode(isDarkMode);
    }

    const script = () => {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    return (
        <div>
            <script dangerouslySetInnerHTML={{ __html: `(${script.toString()})()`}} />
            <label className="relative flex justify-between items-center group p-2 cursor-pointer">
                <input type="checkbox" className="theme-toggle sr-only peer" onChange={() => toggleMode(!darkMode)}/>
                <span className={`w-16 h-8 flex p-1 shadow-md ring-1 ring-slate-700/10 bg-gradient-to-r from-cyan-300 to-cyan-500 rounded-full ${loading ? 'after:translate-x-4' : ''} duration-300 ease-in-out peer-checked:bg-gradient-to-r peer-checked:from-blue-950 peer-checked:to-blue-300 after:w-6 after:h-6 after:bg-white after:ring-1 after:ring-slate-700/10 after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-8 group-hover:after:translate-x-1 group-hover:after:peer-checked:translate-x-7`}></span>
                
                {loading ? (
                    <>
                        <span className="absolute z-10 text-slate-400 translate-x-6"><FaSpinner className="animate-spin"/></span>
                    </>
                ) : (
                    <>
                        <span className="absolute z-10 text-orange-400 translate-x-2 duration-300 ease-in-out peer-checked:translate-x-10 peer-checked:opacity-0 group-hover:translate-x-3"><FaSun/></span>
                        <span className="absolute z-10 opacity-0 text-indigo-800 translate-x-2 duration-300 ease-in-out peer-checked:opacity-100 peer-checked:translate-x-10 peer-checked:block group-hover:peer-checked:translate-x-9"><FaMoon /></span>
                    </>
                )}
                
            </label>
        </div>
    )
}