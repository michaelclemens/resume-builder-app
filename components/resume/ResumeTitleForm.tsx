'use client'

import { useFormStatus } from 'react-dom'
import { FaEdit, FaSpinner } from 'react-icons/fa'

export default function ResumeTitleForm({ title }: { title: string }) {
  const { pending } = useFormStatus()
  return (
    <>
      <div className="flex flex-grow">
        <input
          type="text"
          name="title"
          defaultValue={title}
          className="w-full border-none bg-transparent text-center text-4xl font-semibold focus-within:ring-0 focus:ring-0 disabled:select-none disabled:opacity-50"
          disabled={pending}
        />
      </div>
      <button
        className="absolute inset-y-0 right-0 flex items-center rounded-br-lg rounded-tr-lg border-l border-l-slate-700/30 bg-slate-300 pl-4 pr-5 disabled:select-none disabled:opacity-50 dark:border-l-slate-400/20 dark:bg-slate-900"
        disabled={pending}
      >
        <span className="translate-x-1">
          {pending ? <FaSpinner title="Loading..." className="animate-spin" size="1.5rem" /> : <FaEdit size="1.5rem" />}
        </span>
      </button>
    </>
  )
}
