import { ReactNode } from 'react'

export default function CtaButton({ children, title, onClick }: { children: ReactNode; title?: string; onClick?: () => Promise<void> | void }) {
  return (
    <div className="mx-1 my-3 rounded-lg p-3 shadow-md ring-1 ring-slate-300/60 backdrop-blur-sm dark:text-black dark:ring-slate-400/20">
      <button
        aria-label={title}
        type="submit"
        title={title}
        onClick={onClick}
        className="w-full rounded-md bg-slate-300/70 px-2 py-5 text-4xl font-bold ring-1 ring-slate-300/60 transition-all duration-500 hover:bg-slate-300 dark:bg-slate-900/70 dark:ring-slate-400/20 hover:dark:bg-slate-900"
      >
        <span className="flex items-center justify-center bg-gradient-to-r from-green-700 via-cyan-600 to-sky-600 bg-clip-text text-transparent dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500">
          {children}
        </span>
      </button>
    </div>
  )
}
