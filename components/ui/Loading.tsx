import { FaSpinner } from 'react-icons/fa'

export default function Loading({ showSpinner = true }: { showSpinner?: boolean }) {
  return (
    <div className="absolute top-0 left-0 z-50 flex h-full w-full animate-pulse items-center justify-center rounded-md bg-slate-100/60 ring-slate-700/10 select-none dark:bg-slate-700/60 dark:ring-slate-700">
      {showSpinner && (
        <div className="text-slate-500">
          <FaSpinner title="Loading..." className="animate-spin" size="2em" />
        </div>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  )
}
