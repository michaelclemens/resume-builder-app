export default function SubmitButton({ label, disabled = false }: { label: string; disabled?: boolean }) {
  return (
    <div className="leading-5 text-white">
      <button
        type="submit"
        disabled={disabled}
        className="w-full rounded-md bg-gray-500 px-8 py-2.5 ring-1 ring-slate-700/10 transition-colors duration-500 hover:bg-green-800 disabled:opacity-50 disabled:select-none dark:bg-slate-900 dark:ring-slate-700 dark:hover:bg-green-950"
      >
        {label}
      </button>
    </div>
  )
}
