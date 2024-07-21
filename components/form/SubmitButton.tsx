export default function SubmitButton({ label, disabled = false }: { label: string, disabled?: boolean }) {
    return (
        <div className="mt-2 leading-5 text-white">
            <button 
                type="submit" 
                disabled={disabled} 
                className="w-full px-8 py-2.5 transition-colors duration-500 bg-gray-500 rounded-md hover:bg-green-800 disabled:opacity-50 disabled:pointer-events-none"
            >
                {label}
            </button>
        </div>
    )
}