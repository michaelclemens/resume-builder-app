"use client"

import useTheme from "@/hooks/useTheme";
import { FaMoon, FaSun } from "react-icons/fa"

export default function ThemeToggle() {
    const { darkMode, toggleMode } = useTheme();
    return (
        <div>
            <label className="relative flex justify-between items-center group p-2 cursor-pointer z-20">
                <input type="checkbox" className="sr-only" onChange={() => toggleMode(!darkMode)}/>
                <span className={
                    `w-16 h-8 flex p-1 rounded-full ring-1 ring-slate-400/20 bg-gradient-to-r from-cyan-200 to-cyan-600 dark:from-black dark:to-slate-600 
                    after:w-6 after:h-6 after:rounded-full after:ring-1 after:ring-slate-400/20 after:bg-white after:dark:bg-slate-900 after:duration-300 after:dark:translate-x-8 group-hover:after:translate-x-1 group-hover:after:dark:translate-x-7`
                }></span>
                
                <span className="absolute opacity-100 text-orange-400 translate-x-2 duration-300 ease-in-out dark:opacity-0 group-hover:translate-x-3"><FaSun/></span>
                <span className="absolute opacity-0 text-slate-500 translate-x-10 duration-300 ease-in-out dark:opacity-100 group-hover:dark:translate-x-9"><FaMoon /></span>
            </label>
        </div>
    )
}