import { FaSpinner } from "react-icons/fa";

export default function Loading({ showSpinner = true }: { showSpinner?: boolean }) {
    return (
        <div className="absolute top-0 left-0 h-full w-full select-none animate-pulse z-50 flex items-center justify-center bg-slate-100/60 rounded-md ring-slate-700/10 dark:bg-slate-700/60 dark:ring-slate-700">
            {showSpinner && <div className="text-slate-500"><FaSpinner className="animate-spin" size="2em" /></div>}
            <span className='sr-only'>Loading...</span>
        </div>
    )
}