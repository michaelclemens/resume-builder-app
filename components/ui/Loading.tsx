import { FaSpinner } from 'react-icons/fa'

export default function Loading({ showSpinner = true }: { showSpinner?: boolean }) {
  return (
    <div className='absolute left-0 top-0 z-50 flex h-full w-full animate-pulse select-none items-center justify-center rounded-md bg-slate-100/60 ring-slate-700/10 dark:bg-slate-700/60 dark:ring-slate-700'>
      {showSpinner && (
        <div className='text-slate-500'>
          <FaSpinner className='animate-spin' size='2em' />
        </div>
      )}
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
