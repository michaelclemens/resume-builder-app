export default function SubmitButton({ label, disabled = false }: { label: string, disabled?: boolean }) {
    return (
        <div className="mt-2 leading-5 text-white">
            <button 
                type="submit" 
                disabled={disabled} 
                className="w-full px-8 py-2.5 transition-colors duration-500 bg-gray-500 rounded-md ring-1 ring-slate-700/10 hover:bg-green-800 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:hover:bg-green-950 dark:ring-slate-700"
            >
                {label}
            </button>
        </div>
    )
}